import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import { message,Button,Modal,Input,Radio,Card } from 'antd';

const RadioGroup = Radio.Group;

const Nominations = [
  {
    "id": "1",
    "question": "Best College in  R&D Award",
    "options": [
      {
        "name": "Anurag Group of Institutions - Hyderabad",
        "value": "anrh",
        "src": "anurag_collegelogo"
      },
      {
        "name": "CMR Group of Institutions - Hyderabad",
        "value": "cmrm",
        "src": "cmr_grouplogo"
      },
      {
        "name": "MLR Institute of Technology - Hyderabad",
        "value": "mlid",
        "src": "mlrit_collegelogo"
      },
      {
        "name": "Vignana Bharathi Institute Of Technology - Hyderabad",
        "value": "vbit",
        "src": "vbit_collegelogo"
      }
    ]
  },
  {
    "id": "2",
    "question": "Best Infrastructure Award",
    "options": [
      {
        "name": "CMR Group of Institutions - Hyderabad",
        "value": "cmrm",
        "src": "cmr_grouplogo"
      },
      {
        "name": "CVSR College OF Engineering - Hyderabad",
        "value": "cvsr",
        "src": "cvsr_logo"
      },
      {
        "name": "Guru Nanak Institutions - Hyderabad",
        "value": "gnit",
        "src": "gni_logo"
      },
      {
        "name": "Lakireddy Bali Reddy College of Engineering - Vijayawada",
        "value": "lbce",
        "src": "lbrce_logo"
      },
      {
        "name": "Mahatma Gandhi Institute of Technology - Hyderabad",
        "value": "mgit",
        "src": "mgit_logo"
      },
      {
        "name": "DVR & Dr.HS MIC College of Technology - Vijayawada",
        "value": "dvrc",
        "src": "mict_logo"
      }
    ]
  },
  {
    "id": "3",
    "question": "Co Curricular Award",
    "options": [
      {
        "name": "MLR Institute of Technology - Hyderabad",
        "value": "mlid",
        "src": "mlrit_logo"
      },
      {
        "name": "Narayana Engineering College - Gudur",
        "value": "narn",
        "src": "narayanacollege_logo"
      },
      {
        "name": "Nadimpalli Satyanarayana Raju Institute of Technology - Vishakapatnam",
        "value": "nsrt",
        "src": "nsrit_logo"
      },
      {
        "name": "Potti Sriramulu College of Engineering - Vijayawada",
        "value": "pscv",
        "src": "pscmrcollege_logo"
      },
      {
        "name": "SR Engineering College - Warangal",
        "value": "srec",
        "src": "sreccollege_logo"
      },
      {
        "name": "Usha Rama College of Engineering - Vijayawada",
        "value": "urce",
        "src": "usharamacollege_logo"
      }
    ]
  },
  {
    "id": "4",
    "question": "E-Cell Award",
    "options": [
      {
        "name": "Muffakham Jah College of Engineering and Technology - Hyderabad",
        "value": "mjcet",
        "src": "mjcollege_logo"
      },
      {
        "name": "SR Engineering College - Warangal",
        "value": "srec",
        "src": "srec_logo"
      },
      {
        "name": "Vardhaman College of Engineering - Hyderabad",
        "value": "vmeg",
        "src": "Vardhaman_logo"
      },
      {
        "name": "Vasavi College of Engineering - Hyderabad",
        "value": "vasv",
        "src": "vasavicollege_logo"
      },
      {
        "name": "VNR Vignana Jyothi Institute of Engineering and Technology - Hyderabad",
        "value": "vjec",
        "src": "vnrvjiet_logo"
      }
    ]
  },
  {
    "id": "5",
    "question": "Eco-Friendly Award",
    "options": [
      {
        "name": "Bhoj Reddy Engineering College for Women - Hyderabad",
        "value": "brecw",
        "src": "bhojreddy_logo"
      },
      {
        "name": "G. Narayanamma Institute of Technology and Science - Hyderabad",
        "value": "gntw",
        "src": "gnarayanammacollege_logo"
      },
      {
        "name": "Hyderabad Institute of Technology and Management - Hyderabad",
        "value": "hitm",
        "src": "hitamcollege_logo"
      },
      {
        "name": "Loyola Academy Degree and PG College - Secunderabad",
        "value": "loyl",
        "src": "loyola_logo"
      },
      {
        "name": "Vignana Bharathi Institute of Technology - Hyderabad",
        "value": "vbit",
        "src": "vbit_logo"
      }
    ]
  },
  {
    "id": "6",
    "question": "Emerging College Award",
    "options": [
      {
        "name": "BVRIT Hyderabad College of Engineering for Women - Hyderabad",
        "value": "bvri",
        "src": "bvritw_logo"
      },
      {
        "name": "Roots Collegium Business School - Hyderabad",
        "value": "tmln",
        "src": "rootscollege_logo"
      },
      {
        "name": "Sphoorthy Engineering College - Hyderabad",
        "value": "sphn",
        "src": "Sphoorthyengineeringcollege_logo"
      },
      {
        "name": "Sreyas Institute of Engineering and Technology - Hyderabad",
        "value": "srys",
        "src": "sreyas_logo"
      },
      {
        "name": "VEMU Institute of Technology - Chitoor",
        "value": "vemu",
        "src": "vemucollege_logo"
      }
    ]
  },
  {
    "id": "7",
    "question": "Event Participation Award",
    "options": [
      {
        "name": "CMR Engineering College - Hyderabad",
        "value": "cmrn",
        "src": "cmrec_logo"
      },
      {
        "name": "Guru Nanak Institutions - Hyderabad",
        "value": "gnit",
        "src": "gni_logo"
      },
      {
        "name": "Jayamukhi Institute of Technological Sciences - Warangal",
        "value": "jits",
        "src": "jitsimage_logo"
      },
      {
        "name": "Institute Of Aeronautical Engineering - Hyderabad",
        "value": "iare",
        "src": "iare_logo"
      },
      {
        "name": "Sphoorthy Engineering College - Hyderabad",
        "value": "sphn",
        "src": "Sphoorthyengineeringcollege_logo"
      }
    ]
  },
  {
    "id": "8",
    "question": "Placement Award",
    "options": [
      {
        "name": "BVRIT - Hyderabad",
        "value": "bvri",
        "src": "bvrit_logo"
      },
      {
        "name": "Chaitanya Bharathi Institute of Technology - Hyderabad",
        "value": "cbit",
        "src": "cbit_logo"
      },
      {
        "name": "CVR College of Engineering - Hyderabad",
        "value": "cvrh",
        "src": "cvr_logo"
      },
      {
        "name": "G. Narayanamma Institute of Technology - Hyderabad",
        "value": "gntw",
        "src": "gnarayanammacollege_logo"
      },
      {
        "name": "G Pulla Reddy College of Engineering and Technology - Kurnool",
        "value": "gpre",
        "src": "gprec_logo"
      }
    ]
  },
  {
    "id": "9",
    "question": "Sports College Award",
    "options": [
      {
        "name": "CMR Group of Institutions - Hyderabad",
        "value": "cmrn",
        "src": "cmr_logo"
      },
      {
        "name": "MLR Institute of Technology - Hyderabad",
        "value": "mlid",
        "src": "mlrit_logo"
      },
      {
        "name": "Malla Reddy Group of Institutions - Hyderabad",
        "value": "mltm",
        "src": "mrgi_logo"
      },
      {
        "name": "St.Martin's Engineering College - Hyderabad",
        "value": "mrtn",
        "src": "st martins_logo"
      },
      {
        "name": "TKR College of Engineering and Technology - Hyderabad",
        "value": "tkrc",
        "src": "tkrcollege_logo"
      }
    ]
  }
]

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
      return <Radio style={radioStyle} value={item.value} key={item.value} >{item.name}</Radio>
    });
  }

  render() {
    return (
      <div style={{ background: "url("+require("./images/UGSummitBG")+")", padding: '30px','height':'100vh' }}>
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
      onOk(){ window.location.href = 'http://ugsummit.stumagz.com/vote/'}
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

    //return (<p>We'll be back soon and we apologize for the inconvenience.<a href="http://ugsummit.stumagz.com/vote">go back</a></p>);

    if(this.state.selectedQuestion > 0 && this.state.selectedQuestion <= (Nominations.length))
    {
      return (<div style={{height:'100vh','backgroundColor':'rgb(236, 236, 236)'}}><Question data={Nominations[this.state.selectedQuestion-1]}></Question></div>); 
    }
    return (<p>Kindly move to <a href="http://ugsummit.stumagz.com/vote">ugsummit.stumagz.com/vote</a> to vote for your collge/student for undergrad summit awards.</p>);    
  }
}

export default App;
