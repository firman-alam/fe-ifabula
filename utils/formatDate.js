function formatDate(dateString) {
  const date = new Date(dateString)

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return new Intl.DateTimeFormat('id-ID', options).format(date)
}

export default formatDate
