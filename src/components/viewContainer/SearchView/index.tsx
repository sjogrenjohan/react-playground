import React, { Component, CSSProperties } from 'react';
import { fullscreenAbsolute } from '../../../css';
import { RouteComponentProps } from 'react-router-dom';
import Modal from '../../modal';
import Axios from 'axios';
import ImageCard, { ImageUrls } from '../detailView/imageCard';
import TextSection from '../detailView/textSection';
import { ThemedCSSProperties, ThemeContext } from '../../../contexts/themeContext';
import Button from '../../button';


interface Props {
    params: any,
    match: any
    
}

export interface images {
        favourite: boolean
        urls: ImageUrls
        id: string
}

interface State {
    likes: any
    images: {
        favourite: boolean
        urls: ImageUrls
        id: string
    }[] | undefined
}

export default class DetailView extends Component<Props, State> {

    constructor(props: Props){
        super(props);

        const likes = localStorage.getItem('likes') ? localStorage.getItem('likes') : [];

        this.state = {
            images: undefined,
            likes
        }
    }

    saveImageSession = (obj: images) => {

        let newContent: string | null = localStorage.getItem('likes')
        let newState: Array<string> = [];

        if(newContent) {
            let urlArray: string[] = JSON.parse(newContent)
            urlArray.push(obj.id)
            localStorage.setItem('likes', JSON.stringify(urlArray))
            newState = urlArray;
        } else {
            const initLikes = [obj.id];
            localStorage.setItem('likes', JSON.stringify(initLikes))
            newState = initLikes;
        }

        this.setState({likes: newState});
        
    }
    
    removeImageFromSession = (obj: images) => {
        
        let newContent: string | null = localStorage.getItem('likes')

        if(newContent) {
            let urlArray: string[] = JSON.parse(newContent)
            const index = urlArray.indexOf(obj.id);
            urlArray.splice(index, 1);
            localStorage.setItem('likes', JSON.stringify(urlArray))
            this.setState({likes: urlArray})
        }
    }

    readonly accessKey = "ba99ae4087ce88e88fb4ff64cd0ac8755cc25dcc45fa04631426998cb7b1367e"
    readonly imageDatabaseApiUrl = "https://api.unsplash.com/search/photos/"

    componentDidMount(){
        const  { params }  = this.props.match;
        try {
            const response = Axios.get(this.imageDatabaseApiUrl, {
                params: {
                    client_id: this.accessKey,
                    query: params.query,
                    page: Math.round(Math.random() * 100),
                    per_page: 24,
                }
            }).then(data => {
                let urls: {
                    favourite: boolean
                    urls: ImageUrls
                    id: string
                }[] = []

                data.data.results.forEach((imageUrls) => {
                    urls.push({
                        favourite: false,
                        urls: imageUrls.urls,
                        id: imageUrls.id,
                    })
                });

                this.setState({
                    images: urls
                })
            })
            
        } catch(error) {
            console.error(error)
        }
    }

    render() {
        return (
            <React.Fragment>  
                {this.state.images ? (
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <TextSection query={this.props.match.params.query} />
                    {this.state.images.map((image) => (
                        <>
                        <ImageCard likes={this.state.likes} image={image} saveImageToStorage={this.saveImageSession} removeImageFromSession={this.removeImageFromSession} />
                        </>
                    ))}</div>
                ): (
                    <>Laddar...</>
                )}
            </React.Fragment>
        );
    }
}

const imageContainer: ThemedCSSProperties = (theme) => ({
    margin: '1em',
    flexGrow: 1,
    background: `${theme.background.primary}AA`,
    width: '12em',
    height: '18em',
    transition: 'all 300ms'
})