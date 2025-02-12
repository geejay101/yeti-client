export default {
  messages: {
    en: {
      tableMessage: {
        status: 'Status',
        amount: 'Amount',
        notes: 'Notes',
        completePayment: 'Complete payment',
        'created-at': 'Created At',
        'type-name': 'Type',
        statuses: {
          completed: 'Completed',
          canceled: 'Canceled',
          pending: 'Pending',
        },
      },
      newPaymentModal: {
        title: 'Charge account',
        submit: 'Submit',
        cancel: 'Cancel',
        amount: 'Amount (USDT)',
        placeholder: 'Enter the amount of money (5-5000)',
        feeNotification: 'Payment gateway may charge additional commission fee',
      },
      actions: {
        newPayment: 'New payment',
      },
      paymentCreate: {
        errorNotification: 'Failed to create payment',
        amountError: 'Invalid amount (5-5000)',
      },
    },
    ua: {
      tableMessage: {
        status: 'Статус',
        amount: 'Сума',
        notes: 'Примітки',
        completePayment: 'Завершити платіж',
        'created-at': 'Створено',
        'type-name': 'Тип',
        statuses: {
          completed: 'Виконано',
          canceled: 'Скасовано',
          pending: 'В обробці',
        },
      },
      newPaymentModal: {
        title: 'Поповнити рахунок',
        submit: 'Створити',
        amount: 'Сума (USDT)',
        cancel: 'Відміна',
        placeholder: 'Уведіть суму (5-5000)',
        feeNotification: 'Платіжна система може стягувати додаткову комісію',
      },
      actions: {
        newPayment: 'Створити платіж',
      },
      paymentCreate: {
        errorNotification: 'Виникла помилка при створенні платежу',
        amountError: 'Сума некоректна (5-5000)',
      },
    },
  },
};
