import React from 'react'
import githubIcon from '../../res/github-icon.png'
// imported other.css in index.js

const About = () =>{
    return(
        <div className="about center white-text">
            <h2>About</h2>
            <p>While staying in quarantine, I realized that it was getting a bit tedious to keep track of all of my work and when they are due. My teachers had many different ways of getting assignments to me, meaning there was no central place to keep all of my assignments. I knew many other students were going through this same issue, so I decided that for this hackathon, I will help other students like me stay on top of their work and Get It Done!</p>
            <a href="https://github.com/Mohammed532/Get-It-Done"><img src={githubIcon} width="100px" height="100px" alt="Github Repo" /><h5 className="github-link">Link to Github Repo</h5></a>
        </div>
    )
}

export default About