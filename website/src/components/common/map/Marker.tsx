import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface IMarker {
  lat: number | null;
  lng: number | null;
}

class Marker extends React.Component<IMarker> {
  public render() {
    return (
      <FaMapMarkerAlt
        size={40}
        color={'red'}
        // text="My Marker"
        style={styles.iconStyle}
      />
    );
  }
}

const styles: any = {
  iconStyle: {
    position: 'absolute',
    width: 35,
    height: 35,
    top: -35,
    left: -20
  }
};

export default Marker;
