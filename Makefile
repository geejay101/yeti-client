pkg_name = yeti-client

lintian_flag := $(if $(lintian),--lintian,--no-lintian)
debian_host_release != lsb_release -sc

version = $(shell ./ci/gen_version.sh)
debian_version = $(shell echo $(version) | sed 's/_/~/' | sed 's/-master/~master/' | sed 's/-rc/~rc/')-1
commit = $(shell git rev-parse HEAD)

app_dir := /opt/yeti-client
app_files := dist

export DEBFULLNAME ?= YETI development team
export DEBEMAIL ?= team@yeti-switch.org


#Logging functions
define info
        echo -e '\n\e[33m> msg \e[39m\n'
endef

define err
        echo -e '\n\e[31m> msg \e[39m\n'
endef

all:
	@echo "make all"

.PHONY: install
install: $(app_files)
	$(info:msg=install app files)
	@mkdir -p $(DESTDIR)$(app_dir)
	tar -c --no-auto-compress $^ | tar -x -C $(DESTDIR)$(app_dir)

clean:
	make -C debian clean

.PHONY: package
package: chlog
	@$(info:msg=Installing modules)
	yarn install
	@$(info:msg=Building JS)
	yarn build
	@$(info:msg=Building package)
	dpkg-buildpackage -us -uc -b

.PHONY: chlog
chlog: clean-chlog
ifeq "$(auto_chlog)" "no"
	@$(info:msg=Skipping changelog generation)
else
	@$(info:msg=Generating changelog Supply auto_chlog=no to skip.)
	dch \
                --create \
                --package "$(pkg_name)" \
                --newversion "$(debian_version)" \
                --distribution "$(debian_host_release)" \
                "Release $(version), commit: $(commit)"
endif


.PHONY: clean-chlog
clean-chlog:
ifneq "$(auto_chlog)" "no"
	@$(info:msg=Removing changelog)
	@rm -vf debian/changelog
endif

