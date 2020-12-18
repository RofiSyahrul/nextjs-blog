import dayjs from 'dayjs'

/**
 * @typedef {Object} DateProps
 * @property {string} dateString
 * @property {string} title
 */

/** @type {React.FC<DateProps>} */
const DateComponent = ({ dateString, title }) => {
  const formatted = dayjs(dateString).format('MMMM D, YYYY')
  return (
    <span title={title}>
      {`${title}: `}
      <time dateTime={dateString}>{formatted}</time>
    </span>
  )
}

DateComponent.displayName = 'Date'
export default DateComponent
