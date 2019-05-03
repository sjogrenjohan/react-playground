import React, { CSSProperties, Component } from 'react';
import ViewSection from './viewSection';
import ImageLink from './imageLink';
import { Link } from 'react-router-dom';

interface Props {
    detailViews: string[]
}

interface State {
    value: any

}


/** React function component */
export default class MasterView extends Component<Props, State> {

    constructor(props: Readonly<Props>){
        super(props);
        this.state = { 
            value: ""
        }
    }

    handleChange = (e: { target: { value: any; }; }) => {
        this.setState({
            value: e.target.value
        })
    }
    container: CSSProperties | undefined;

    render () {
        return (
        <div style={container}>
            <input 
            style={searchBar} 
            type="text" value={this.state.value} 
            className="input" 
            onChange={this.handleChange} 
            //onKeyPress={this.state.value}
            placeholder="Sök efter din bild här..." />
            <Link style={searchButton} to={`search/${this.state.value}`}><h2>Sök efter bild</h2></Link>
            
        {/* Forest, Sky & Desert containers */}
        {/*      {this.props.detailViews.map((view) => (
                <ViewSection key={view}>
                    <ImageLink view={view}/>
                </ViewSection>
                
        ))}  */}
        </div>
    );
}
}


const container: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: '1em'
}

const searchBar: CSSProperties = {
    padding: '12px 20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    marginBottom: '1em'
}

const searchButton: CSSProperties = {
    backgroundColor: '#f44336',
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    border: '1px solid #f44336',
    borderRadius: '4px',
    boxSizing: 'border-box'
}