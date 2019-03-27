import React, { Component } from 'react'

export default class AboutMe extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{ minHeight: 800, paddingLeft: 50, display: 'flex', flexDirection: 'row' }}>

                <div style={{ display: 'flex', alignSelf: 'flex-end', flexDirection: 'column', lineHeight: 0.5 }}>
                    <div><h2>Email: </h2><p>hwkokok@hotmail.com</p></div>
                    <div><h2>Github: </h2><p><a href='https://github.com/awesomeHu' target='_blank'>https://github.com/awesomeHu</a></p></div>
                    <div><h2>WeChat: </h2><p><img src={require('../assets/WeChat_QR.png')} style={{ width: 200, height: 200 }} /></p></div>
                </div>
                <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: 850, height: 550, alignSelf: 'center', fontSize: 25, fontFamily: 'serif', color: '#2F4F4F', }}>
                        <h3>Hi, I’m Daniel. Nice to meet you.</h3>
                        <p style={{ marginTop: -25 }}>I am a self-taught developer who originally had a master's degree in chemical engineering.
                        I started with an interest in programming and reading several books about front end technologies, then I finished the tasks
                        in the FreeCodeCamp community forum step by step. I also bought many courses from Udemy and other resources. 
                        All of these endeavors laid a solid foundation for my career.
                        The learning journey of a self-taught developer has been tough with
                        lots of obstacles and uncertainty especially for those like me that had zero programming experience.
                        Rome is not built in one day.
                        An important way to learn anything is to focus on and master each individual step. For fields like programming,
                        I understand that it involves many small steps, therefore, it requires patience,
                        dedication, and persistence. With my enthusiasm and enormous interest in this field,
                        I will keep learning from different resources and mastering new technologies.
                    I believe that I have the strength and skills to be better down the road.</p> </div></div>
            </div>
        )
    }
}