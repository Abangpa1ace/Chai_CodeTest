import React, { Component } from 'react';
import TeamComponent from '../team-component/team-component';
import './team-list.css';

class TeamList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            input: {
                value: '',
                validation: false,
            }
        };
    }

    componentDidMount() {
        this.setState({
            teams: [
                {
                    name: 'Team1',
                    channels: [{
                        name: 'Channel1',
                        index: 1
                    },
                    {
                        name: 'Channel2',
                        index: 2
                    }]
                },
                {
                    name: 'Team2',
                    channels: [{
                        name: 'Channel1',
                        index: 1
                    },
                    {
                        name: 'Channel2',
                        index: 2
                    }]
                },
            ]
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

    addTeam = () => {
        const { teams, input } = this.state;
        const { value, validation } = input;
        
        if (validation) {
            this.setState({
                teams: teams.concat({ name: value, channels: [] }),
                input: {
                    value: '',
                    validation: false,
                }
            })
        }
    }

    render() {
        const { teams, input } = this.state;
        const { value, validation } = input;
        const { formValidation, addTeam } = this;
        return (
            <div>
                <div className="teams-list">
                    <ul>
                        {teams && teams.map((team, idx) => 
                        (
                            <li key={idx}>
                                <TeamComponent team={team} teamIndex={idx} />
                            </li>
                        ))}
                    </ul>  
                </div>
                <div className="add-team">
                    <b>Add Team</b>
                    <input 
                        value={value}
                        onChange={formValidation}
                        placeholder="Team name"/>
                    <button 
                        disabled={!validation}
                        onClick={addTeam}
                    >
                        &#8853;
                    </button>
                </div>
            </div>
        );
    }
}

export default TeamList;
