#!/bin/bash
if [ "$PACKAGE_TYPE" = "test" ]; then
	echo "0.0.0+test0"
	exit 0
fi

if git describe --tags --exact &>/dev/null; then
        if [ "$PACKAGE_TYPE" = "nightly" ]; then
                git describe --tags --exact | sed 's/$/+nightly0/'
        else
                git describe --tags --exact
        fi
else
        git describe --tags | sed -E 's/-([0-9]+)-[^-]*$/+nightly\1/'
fi

