import dayjs from 'dayjs'

interface DateProps {
  dateString: string
  title: string
}

const DateComponent: React.FC<DateProps> = ({ dateString, title }) => {
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
