import './index.css'

const FiltersGroup = props => {
  const renderEmployment = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(each => {
      const {changeEmploymentType} = props
      const onClickEmploymentItem = () =>
        changeEmploymentType(each.employmentTypeId)

      return (
        <li className="employment-list" key={each.employmentTypeId}>
          <input
            className="employment-input"
            onClick={onClickEmploymentItem}
            type="checkbox"
            value={each.label}
            id={each.employmentTypeId}
          />
          <label htmlFor={each.employmentTypeId} className="filter-label">
            {each.label}
          </label>
        </li>
      )
    })
  }

  const renderSalary = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(each => {
      const {changeSalaryCategory} = props
      const onClickSalaryItem = () => changeSalaryCategory(each.salaryRangeId)

      return (
        <li className="employment-list" key={each.salaryRangeId}>
          <input
            className="employment-input"
            onClick={onClickSalaryItem}
            type="radio"
            name="salary"
            value={each.label}
            id={each.salaryRangeId}
          />
          <label htmlFor={each.salaryRangeId} className="filter-label">
            {each.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentType = () => (
    <div className="employment-container">
      <h1 className="employment-header">Type of Employment</h1>

      <ul className="employment-list-container">{renderEmployment()}</ul>
    </div>
  )

  const renderSalaryRange = () => (
    <div className="employment-container">
      <h1 className="employment-header">Salary Range</h1>

      <ul className="employment-list-container">{renderSalary()}</ul>
    </div>
  )

  return (
    <div>
      {renderEmploymentType()}
      <hr className="line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
