import React, { Component, CSSProperties, Fragment } from 'react';
import Spinner from '../../spinner';
import Modal from '../../modal';
import {images} from '../SearchView'
import { ThemedCSSProperties, ThemeContext, ThemeState } from '../../../contexts/themeContext';



export interface ImageUrls {
    id: string
    full: string
    raw: string
    regular: string
    small: string
    thumb: string
}

interface Props {
    likes: any
    image: {
        favourite: boolean
        urls: ImageUrls
        id: string
    }
    saveImageToStorage: (obj: images) => void
    removeImageFromSession: (obj: images) => void
}
interface State {
    isHover: boolean
    isModalOpen: boolean
}

export default class ImageCard extends Component<Props> {

    state: State = {
        isHover: false,
        isModalOpen: false
    }

    style(theme: ThemeState): CSSProperties {
        const hover: CSSProperties = this.state.isHover ? {
            boxShadow: `0 8px 40px -5px ${theme.foreground.darkened}`,
            transform: 'scale(1.05, 1.05) translateY(-1%)'
        } : {}
        return {
            ...imageContainer(theme),
            ...hover
        }
    }

    renderHeartIcon(id: string) {
        if (!this.props.likes.includes(id)) {
            return (
                <img style={heartIcon} src={"/assets/heart-outline.png"} onClick={() => this.props.saveImageToStorage(this.props.image)}/>
                )
            } else {
                return (
                    <img style={heartIcon} src={"/assets/heart.png"} onClick={() => this.props.removeImageFromSession(this.props.image)}/>
            )
        }
    }

    onMouseEnter = () => this.setState({ isHover: true })
    onMouseLeave = () => this.setState({ isHover: false })
    openModal = () => this.setState({ isModalOpen: true });
    closeModal = () => this.setState({ isModalOpen: false });

    render() {
        const { image } = this.props
        return (
            <Fragment>
                <ThemeContext.Consumer>
                    {({ theme }) => (
                        <div style={{position: "relative"}}>
                            <div
                                style={this.style(theme)}
                                onMouseEnter={this.onMouseEnter}
                                onMouseLeave={this.onMouseLeave}
                                onClick={this.openModal}
                            >
                                {image.urls.small ? <img src={image.urls.small} style={card}/> : <Spinner/>}
                            </div>
                            {this.renderHeartIcon(image.id)}
                        </div>
                    )}
                </ThemeContext.Consumer>
                {
                    this.state.isModalOpen ? (
                        <Modal shouldClose={this.closeModal}>
                            <img src={image.urls.regular} style={preview}/>
                        </Modal>
                    ) : null
                }
            </Fragment>
        )
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

const card: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
}
const preview: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
}

const heartIcon: CSSProperties = {
    position: 'absolute',
    left: '2em',
    top: '2em',
    zIndex: 10
}