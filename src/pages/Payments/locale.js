export default {
  messages: {
    en: {
      tableMessage: {
        status: 'Status',
        amount: 'Amount',
        notes: 'Notes',
        'created-at': 'Created At',
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
        placeholder: 'Enter the amount of money (5-1000)',
      },
      actions: {
        newPayment: 'New payment',
      },
      paymentCreate: {
        errorNotification: 'Failed to create payment',
        amountError: 'Invalid amount (5-1000)',
      },
    },
    ua: {
      tableMessage: {
        status: 'Статус',
        amount: 'Сума',
        notes: 'Примітки',
        'created-at': 'Створено',
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
        placeholder: 'Уведіть суму (5-1000)',
      },
      actions: {
        newPayment: 'Створити платіж',
      },
      paymentCreate: {
        errorNotification: 'Виникла помилка при створенні платежу',
        amountError: 'Сума некоректна (5-1000)',
      },
    },
  },
};
