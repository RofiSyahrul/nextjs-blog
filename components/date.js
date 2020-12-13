import dayjs from 'dayjs'

/**
 * @typedef {Object} DateProps
 * @property {string} dateString
 */

/** @type {React.FC<DateProps>} */
const DateComponent = ({ dateString }) => {
  const formatted = dayjs(dateString).format('MMMM D, YYYY')
  return <time dateTime={dateString}>{formatted}</time>
}

DateComponent.displayName = 'Date'
export default DateComponent
