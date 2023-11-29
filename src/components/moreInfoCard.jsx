const MoreInfoCard = ({country, index, onClick}) => {




  return (
      <div className="moreinfo">
          <h2>{country.name.common}</h2>
          <img src={country.flags.svg} alt="" />
          
      </div>
  )
}

export default MoreInfoCard