import React, { Component } from 'react';
import './team-component.css';

class TeamComponent extends Component {
    constructor(props) {
        super(props);
        this.teamIndex = this.props.teamIndex;
        this.sortMode = ['order', 'nameAscending', 'nameDescending'];
        this.state = {
            team: {},
            input: {
                value: '',
                validation: false,
            },
            sort: '',
        }
    }

    componentDidMount() {
        this.setState({
            team: this.props.team,
            sort: this.sortMode[0],
        })
    }

    formValidation = (event) => {
        const { value } = event.target;
        const regex = /^[0-9]*$/;
        this.setState({
            input: {
                value,
                validation: value.length !== 0 && !regex.test(value),
            }
        })
    }

    removeChannel = (name) => {
        this.setState({
            team: {
                ...this.state.team,
                channels: this.state.team.channels.filter(e => e.name !== name),
            }
        })
    }

    addChannel = () => {
        const { team, input } = this.state;
        const { channels } = team;
        const { value, validation } = input;

        if (validation) {
            this.setState({
                team: {
                    ...team,
                    channels: channels.concat({ name: value, index: channels.length+1 })
                },
                input: {
                    value: '',
                    validation: false,
                }
            })
        }
    }
    
    sortChannel = () => {
        const { team, sort } = this.state;
        const { channels } = team;
        const { sortMode } = this;

        const newIndex = (sortMode.findIndex(mode => mode === sort) + 1) % sortMode.length;
        const newMode = sortMode[newIndex];
        
        let newChannel;
        if (newMode === "order") {
            newChannel = channels.sort((a,b) => a.index - b.index)
        }
        else if (newMode === "nameAscending") {
            newChannel = channels.sort((a,b) => a.name < b.name ? -1 : 1)
        }
        else if (newMode === "nameDescending") {
            newChannel = channels.sort((a,b) => a.name < b.name ? 1 : -1)
        }
        
        this.setState({
            team: {
                ...team,
                channels: newChannel,
            },
            sort: newMode,
        })
    }

    render() {
        const { team, input } = this.state;
        const { name, channels } = team;
        const { value, validation } = input;
        const { formValidation, removeChannel, addChannel, sortChannel } = this;
        return (
        <div>
            {
                team && 
                <div>
                    <span className="team-name">{name}</span>
                    <button className="sort"
                        onClick={sortChannel}
                    >
                        &#8597;
                    </button>
                    <span className="add-channel">
                        <input 
                            value={value}
                            onChange={formValidation}
                            placeholder="Channel name"/>
                        <button
                            disabled={!validation}
                            onClick={addChannel}
                        >
                            &#8853;
                        </button>
                    </span>
                </div>
            }
            {
                team &&
                <ul className="one">
                    { channels && channels.map((channel, idx) => (
                        <li className="channel-name" key={channel.index}>
                            <span>{channel.name}</span>
                            <button
                                onClick={() => removeChannel(channel.name)}
                                >
                                &#8854;
                            </button>
                        </li>
                    ))}
                </ul>
            }
        </div>
        );
    }
}

export default TeamComponent;
