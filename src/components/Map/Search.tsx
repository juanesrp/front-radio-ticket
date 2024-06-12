import { Wrapper, Status } from "@googlemaps/react-wrapper"
import { SearchComponent } from "./SearchComponent"
import { SetCoordinates } from "."

const render = (status: Status, setCoordinates: SetCoordinates) => {
  switch (status) {
    case Status.LOADING:
      return <div>Different Spinner</div>
    case Status.FAILURE:
      return <div>Different Error component</div>
    case Status.SUCCESS:
      return <SearchComponent setCoordinates={setCoordinates} />
  }
}

type SearchProps = {
  setCoordinates: SetCoordinates
}

export const Search = ({ setCoordinates }: SearchProps) => {
  return (
    <Wrapper
      apiKey="AIzaSyBDpyCap-2Qfmq_8ENjglxqHSr2CwlQ918"
      render={(status) => render(status, setCoordinates)}
      libraries={["places"]}
    />
  )
}