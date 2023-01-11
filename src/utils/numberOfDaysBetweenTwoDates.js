const getPhaseOfNumberOfDaysForADate = (
  subscriptionDate,
  getOnlyDaysNumber
) => {
  const nextDatePayArray = subscriptionDate
    .split('-')
    .map((item) => parseFloat(item))
    .slice(1);

  //* Function to get days remaining to the next payment
  const getDaysForNextPaymentDate = (takeNextMonth = false) => {
    const currentDate = new Date();

    const month = takeNextMonth
      ? currentDate.getMonth() + 1
      : currentDate.getMonth();

    const nextPayDate = new Date(
      currentDate.getFullYear(),
      month,
      nextDatePayArray[1]
    );

    const diff = nextPayDate - currentDate;
    const daysForNextPayment = Math.round(diff / (24 * 60 * 60 * 1000));

    return daysForNextPayment + 1;
  };

  //* Return days only
  if (getOnlyDaysNumber && getDaysForNextPaymentDate() < 0)
    return getDaysForNextPaymentDate(true);
  else if (getOnlyDaysNumber) return getDaysForNextPaymentDate();

  //* Return phrase
  if (getDaysForNextPaymentDate() === 0) return 'El día de pago es hoy';
  else if (getDaysForNextPaymentDate() < 0)
    return `Próximo pago en: ${getDaysForNextPaymentDate(true)} días`;
  else return `Próximo pago en: ${getDaysForNextPaymentDate()} días`;
};

export default getPhaseOfNumberOfDaysForADate;
