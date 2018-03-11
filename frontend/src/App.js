import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import Nominations from './nominations1.json'
import axios from 'axios';
import { message,Button,Modal,Input,Radio,Card,Avatar } from 'antd';

const RadioGroup = Radio.Group;

class Question extends Component {

  constructor(props){
     super(props);
     this.state = {
        value:0
     }
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  getOptionsList(options)
  {
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '60px',
        marginBottom:'30px'
    }

    return options.map(function(item,i){
      return <Radio style={radioStyle} value={item.value} key={item.value} ><Avatar shape="square" size="large" src={require("./images/"+item.src)} />   {item.name}</Radio>
    });
  }

  render() {
    return (
      <div style={{ background: "url("+require("./images/UGSummitBG")+")", padding: '30px' }}>
        <Card bordered={true} style={{ width: "100%" }}>
           <h2 style={{'fontSize':'20px'}}>{this.props.data.question}</h2> 
           <RadioGroup onChange={this.onChange} value={this.state.value}>
            {this.getOptionsList(this.props.data.options)}
          </RadioGroup>
          <br/><br/>
          {this.state.value === 0 ? "": <AuthForm award = {this.props.data.id} valueselected={this.state.value} style={{'float':'right'}}/> }
        </Card>
      </div>
    );
  }

}


class AuthForm extends Component {

  constructor(props){
     super(props);
     this.state = {
        award:this.props.award,
        name:'',
        mobile:'',
        visible: false,
        value:this.props.valueselected,
        id:'',
        otp:0,
        loading:false,
        isVoted:true
     }
  }

  sendForm(){
    let data = {
      name:this.state.name,
      mobile:this.state.mobile,
      award:this.state.award,
      value:this.state.value,
    }

    var config = {
      headers: {'Access-Control-Allow-Origin': '*'}
    };

    if(!data.name || !data.mobile)
    {
      return false;
    }

    this.setState({loading:true});
    axios.defaults.crossDomain = true;
    axios.post('https://us-central1-ugsummit-stumagz.cloudfunctions.net/vote',data,config)
    .then(function (response) {
      if(response.data.result === 1)
      {

        this.setState({'id':response.data.message,loading:false});
      }
      else
      {
        message.error(response.data.message);
        this.setState({ name:'',mobile:'',loading:false});
      }
    }.bind(this))
    .catch(function (error) {

      this.setState({ name:'',mobile:'',loading:false});
    }.bind(this));
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.sendForm()
  }
  handleCancel = (e) => {
    this.setState({
        name:'',
        mobile:'',
        visible: false,
        value:this.props.valueselected,
        id:'',
        otp:0
     });
  }

  checkOTP(){

    let data = {
      otp:parseInt(this.state.otp),
      id:this.state.id
    }

    let config = {
      headers: {'Access-Control-Allow-Origin': '*'}
    };

    this.setState({isLoading:true});
    axios.defaults.crossDomain = true;
    axios.post('https://us-central1-ugsummit-stumagz.cloudfunctions.net/vote',data,config)
    .then(function (response) {
      this.setState({isLoading:false});
      if(response.data.result == 1)
      {
        this.Voted(response.data.message);
      }
      else
      {
        message.error(response.data.message);
        this.setState({'id':''});
      }
    }.bind(this))
    .catch(function (error) {
      this.setState({isLoading:false});
    }.bind(this));

  }

  getDetailsForm(){
    return (<Input.Group>
              <br/>
              <Input placeholder="Name" value={this.state.name} onChange={(e)=>{this.setState({name:e.target.value})}} /><br/><br/>
              <Input placeholder="Mobile Number" value={this.state.mobile} onChange={(e)=>{this.setState({mobile:e.target.value})}} /><br/><br/>
              <Button type="primary" onClick={this.handleOk} loading={this.state.loading} >Next</Button>
            </Input.Group>);
  }

  getOtpForm(){
    return (<div><br/><Input placeholder="One Time Password" onChange={(e)=>{this.setState({otp:e.target.value})}}  /><br/><br/><Button type="primary" onClick={this.checkOTP.bind(this)} loading={this.state.loading} >OK</Button></div>)
  }

  Voted(message) {
    const modal = Modal.success({
      title: message,
      onOk(){ window.location.href = 'http://ugsummit.stumagz.com'}
    });
  }

  render() {

    if(this.props.valueselected === 0)
    {
      return (<div></div>);
    }

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Vote</Button>
        <Modal
          footer={false}
          title= ''
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          wrapClassName="vertical-center-modal"
        >
        {this.state.id === "" ? this.getDetailsForm() : this.getOtpForm()}
        </Modal>
      </div>
    );
  }
}



class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      selectedQuestion:-1
    }
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  componentDidMount(){
    if(this.getParameterByName('id'))
    {
      this.setState({
      selectedQuestion:this.getParameterByName('id')
      })
    }
  }

  render(){
    if(this.state.selectedQuestion > 0 && this.state.selectedQuestion <= (Nominations.length))
    {
      return (<div style={{height:'100vh','backgroundColor':'rgb(236, 236, 236)'}}><Question data={Nominations[this.state.selectedQuestion-1]}></Question></div>); 
    }
    return (<p>Kindly move to <a href="http://ugsummit.stumagz.com/vote">ugsummit.stumagz.com/vote</a> to vote for your collge/student for undergrad summit awards.</p>);
    
  }
}

export default App;
