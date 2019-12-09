import React from 'react';
import ReactAutocomplete from 'react-autocomplete';

class Searchbox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      cityid: ''
    }
  }

  render() {
    return (
      <ReactAutocomplete
        //list of cities
        let items={[
          { city: 'London, UK', cityid: '2643743' },
          { city: 'Boston, US', cityid: '4930956' },
          { city: 'New York, US', cityid: '5128581' },
          { city: 'Paris, FR', cityid: '2988507' },
          { city: 'Melbourne, AU', cityid: '2158177' },
          { city: 'Dubai, AE', cityid: '292223' },
          { city: 'Singapore, SG', cityid: '1880252' },
          { city: 'Kuala Lumpur, MY', cityid: '1733046' },
          { city: 'Istanbul, TR', cityid: '745044' },
          { city: 'Delhi, IN', cityid: '1273294' },
          { city: 'Bangkok, TH', cityid: '1609350' }
        ]}
        shouldItemRender={(item, value) => item.city.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.city}
        renderItem={(item, highlighted) =>
          <div
            key={item.cityid}
            className={`item ${highlighted ? 'item-highlighted' : ''}`}
          >
            {item.city}
          </div>
        }
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        //On select function
        onSelect={(value, key) => { this.onCitySelect(value, key); this.props.cityid(key.cityid) }}
        renderMenu={children => (
          <div className="menu">
            {children}
          </div>
        )}
        //Styles for wrapper and input box
        wrapperStyle={{ paddingTop: '30px' }}
        inputProps={{ id: 'state-autocomplete', placeholder: 'Enter City Name' }}
      />
    )
  }
  //On selection of city from dropdown
  onCitySelect(value, key) {
    console.log('val reaches here', value);
    console.log('lkey reaches here', key);
    this.setState({
      value: value,
      cityid: key.cityid
    });
  }

}
export default Searchbox;
