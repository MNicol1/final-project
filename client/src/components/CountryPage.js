import { useParams } from "react-router-dom"
import useRadio from "../hooks/useRadio"
import ReactAudioPlayer from "react-audio-player";



const CountryPage = () => {

  const { country} = useParams();
console.log(country);

const stations = useRadio({country: country});

    if ( stations.length === 0 ) {
    return <p>Sorry no stations</p>
    }
  
  return (
    <div> {stations.map((item) => {
      return (
        // place Radio componet here
        <div>
          {/* <ReactAudioPlayer
                  src={item.urlResolved}
                  style={{ width: "220px", border: "none" }}
                  controls
                /> */}
          <div>{item.name}</div>
        </div>
      );
    })}</div>
  )
}

export default CountryPage