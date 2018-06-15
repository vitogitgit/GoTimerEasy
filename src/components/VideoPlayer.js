import React, { Component } from 'react';
import Video from 'react-native-video';

export default class VideoPlayer extends Component {
  state = {
    src: null,
    start: false,
  };

  play = (videoPath) => {
    if (this.state.start) {
      setTimeout(() => {
        this.setState({ start: true });
      }, 10);
    }
    this.setState({
      start: !this.state.start,
      src: videoPath,
    });
  }

  render() {
    if (!this.state.start) { return null; }
    return (
      <Video
        source={this.state.src}
        onEnd={() => this.setState({ start: false })}
      />
    );
  }
}
