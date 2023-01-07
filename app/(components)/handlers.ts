export const handleSubmit = async (
  e: any,
  setEmailSent: Function,
  setError: Function
) => {
  e.preventDefault();
  const { name, email, subject, message } = e.target;

  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        subject: subject.value,
        text: message.value,
      }),
    });
    const data = await res.json();
    if (data.error) {
      return new Error(data.error);
    } else if (data.success) {
      setEmailSent(true);
    }
  } catch (err) {
    console.error(err);
    setError(
      'Sorry, there was an error sending your message. Please try again later.'
    );
  }
};
