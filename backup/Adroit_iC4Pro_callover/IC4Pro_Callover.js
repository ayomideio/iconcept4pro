import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import {
  Row,
  Col,
  Button,
  Dropdown,
  Modal,
  ButtonGroup,
  Tooltip,
  OverlayTrigger
} from 'react-bootstrap';
import Form from './Form';
import Table from './Table';
import HistoryModal from './Modal/HistoryModal'
import ActivityModal from './Modal/ActivityModal'
import RecordsDeleteModal from './Modal/RecordsDeleteModal'
import calloverData from '../Data/tempData/ic4pro_callover.json';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Dropdown as Dropdowns } from 'primereact/dropdown';
import 'primeflex/primeflex.css';
import DistributionAnalysis from './Analysis/RTN-Distribution';
import PatternDistribution from './Analysis/RTN-PatternDistribution';
import PatternDistributionDetail from './Analysis/RTN-PatternDistributionDetail';
import ExportData from './ExportModal/iC4Pro_Exports';
import axios from 'axios'
import moment from 'moment'
import { useHistory } from 'react-router';
import iC4Pro_Session_Storage from '../../src/iC4Pro_Session_Storage'


const IC4Pro_Callover = () => {
  const [state, setState] = useState({
    data: [...[]],
    
    rawdata:[...[]],
    credittotal:0,
    debittotal:0,
    transtotal:0,
    transdifference:0,
    transactionInputters:'',
    allusersdropdown:'',
    showForm: false,
    selectedData: null,
    mode: null // Mode available: create, edit, view, delete
  });
  let history=useHistory()
const [thereisdata,setthereisdata]=useState(false)
  const [translimit,setTransLimit]=useState({
    minimal:null,
    maximal:null
  })

  const [allusersdropdown,Setallusersdropdown]=useState('')
  const [activityModal, setActivityModal] = useState(false);

  const handleActivityClose = () => setActivityModal(false);

  const [historyModal, setHistoryModal] = useState(false);

  const handleHistoryClose = () => setHistoryModal(false);

  const [recordsDeleteModal, setRecordsDeleteModal] = useState(false);

  const handleRecDelClose = () => setRecordsDeleteModal(false);

  const [grouping, setGrouping] = useState(false);

  const handleGroupClose = () => setGrouping(false);

  const [distribution, setDistribution] = useState(false);

  const handleDistributionClose = () => setDistribution(false);

  const [patternDistri, setPatternDistri] = useState(false);

  const handlePatternDistriClose = () => setPatternDistri(false);

  const [patternDistriDetail, setPatternDistriDetail] = useState(false);

  const handlePatternDistriDetailClose = () => setPatternDistriDetail(false);

  const [exportData, setExportData] = useState(false);

  const handleExportDataClose = () => setExportData(false);

  const [helpMessage, setHelpMessage] = useState(false);

  const handleHelpMessageClose = () => setHelpMessage(false);

  const [dashboardChart, setDashboardChart] = useState(false);

  const handleDashboardChartClose = () => setDashboardChart(false);



  const [filter] = useState({
    globalFilter: ""
  })

  const handleForm = useCallback((event) => {
    const { name } = event.target;
    setState(prev => ({
      ...prev,
      mode: name || null,
      ...((!name || name === 'create') && { selectedData: null }),
      showForm: !prev.showForm
    }))
  }, []);










  const submitForm = useCallback((data, mode) => {
    if (mode === 'create') {
      setState(prev => ({
        ...prev,
        data: [
          data,
          ...prev.data
        ],
        selectedData: null
      }))
    }
    else if (mode === 'edit') {
      let newData = [...state.data];
      let editedDataId = newData.findIndex(dt => dt.key === data.key);
      newData[editedDataId] = data;
      setState(prev => ({
        ...prev,
        data: newData,
        selectedData: null
      }))
      console.log("Edit Data:", newData)
    }

    setState(prev => ({
      ...prev,
      showForm: false
    }))
  }, [state.data]);

  const reverseDate=(val)=>{
    

    var arr1 = val.split('/');
    var arr2 = arr1[2] +'-' +arr1[1]+'-' + arr1[0]
    
 
    return arr2
  }
  const selectData = useCallback((data) => {
    setState(prev => ({
      ...prev,
      selectedData: data
    }))
    localStorage.removeItem("tokeninputter")
    data.GRP_BY_DATE=reverseDate(data.GRP_BY_DATE)
    localStorage.setItem("tokenbranch",data.IC4_BRANCH_CODE)
    localStorage.setItem("tokendate",data.GRP_BY_DATE)
    
    // alert (iC4Pro_Session_Storage.getName())
  
    
    
   
      history.push('/ic4probsmcallover')
   

  }, []);

  const deleteData = useCallback((e) => {
    e.preventDefault();
    const { data, selectedData } = state;
    if (window.confirm('Are you sure to delete this data?')) {
      setState(prev => ({
        ...prev,
        data: [...data.filter(dt => dt.key !== selectedData.key)],
        selectedData: null,
        showForm: false,
        mode: null,
      }))
    }
  }, [state]);


  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Read Catalog Table
    </Tooltip>
  );
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  
 
  });

  async function getData (){
  
		await axios.get("http://127.0.0.1:8000/callover/index/").then(res=>{
	

     
			var allcredittotalcall=0,allcredittotaldebit=0
      for (var i=0;i<res.data.alldata.length;i++){

        allcredittotalcall+=parseInt(res.data.alldata[i].CREDIT_TOTAL_CALL)
        allcredittotaldebit+=parseInt(res.data.alldata[i].DEBIT_TOTAL_CALL)
       
       
      }
      


      for (var i=0;i<res.data.alldata.length;i++){
        res.data.alldata[i].CREDIT_TOTAL_CALL=formatter.format(res.data.alldata[i].CREDIT_TOTAL_CALL).replace("NGN",'') 
        res.data.alldata[i].DEBIT_TOTAL_CALL=formatter.format(res.data.alldata[i].DEBIT_TOTAL_CALL).replace("NGN",'')
        res.data.alldata[i].GRP_BY_DATE=new Intl.DateTimeFormat('en-NG').format(new Date(res.data.alldata[i].GRP_BY_DATE))
        
        if (!JSON.stringify(res.data.transactionInputters).includes('All Users'))
          res.data.transactionInputters.push({'IC4PROBRANCHCODE': 'All Users', 'IC4PROINPUTTER': 'All Users',
          'PROFILE_NAME': 'All Users'})
       
        setState({
          data:res.data.alldata,
          credittotal:formatter.format(allcredittotalcall).replace("NGN",'') ,
          debittotal:formatter.format( allcredittotaldebit).replace("NGN",'') ,
          transtotal:res.data.alldata.length,
          transdifference:formatter.format(allcredittotalcall-allcredittotaldebit).replace("NGN",'') ,
          transactionInputters:res.data.transactionInputters
       
        })
      }
		
		
      
      // alert(`formatttttttttttttttt                    ${formatter.format(2500).replace("NGN",'')}`) ;
		}).finally(()=>{
			// setLoading(false);
		})
		
	}
	useEffect(()=>{
    // const interval =setInterval(()=>
    // {
    //   ifiC4Pro_Session_Storage.getName()n.length<1)
       
    // },1000)
    getData()
    
	},[]) 



 const handleTransactionInputter =(e) =>{
  Setallusersdropdown(e.target.value)
  // var data={
  //   'inputter':e.target.value
  // }
  let data =new FormData();
  data.append("inputter",e.target.value)
  iC4Pro_Session_Storage.setName(e.target.value)
  

  
   axios.post("http://127.0.0.1:8000/callover/index/",data).then(res=>{
    
	
    var allcredittotalcall=0,allcredittotaldebit=0
    for (var i=0;i<res.data.alldata.length;i++){

      allcredittotalcall+=parseInt(res.data.alldata[i].CREDIT_TOTAL_CALL)
      allcredittotaldebit+=parseInt(res.data.alldata[i].DEBIT_TOTAL_CALL)
        if (!JSON.stringify(res.data.transactionInputters).includes('All Users'))
          res.data.transactionInputters.push({'IC4PROBRANCHCODE': 'All Users', 'IC4PROINPUTTER': 'All Users',
          'PROFILE_NAME': 'All Users'})
      
      
      setState({
        
        credittotal:formatter.format(allcredittotalcall).replace("NGN",'') ,
        debittotal:formatter.format( allcredittotaldebit).replace("NGN",'') ,
        transtotal:res.data.alldata.length,
        transdifference:formatter.format(allcredittotalcall-allcredittotaldebit).replace("NGN",'') ,
        transactionInputters:res.data.transactionInputters
      })
    }
    for (var i=0;i<res.data.alldata.length;i++){
      res.data.alldata[i].CREDIT_TOTAL_CALL=formatter.format(res.data.alldata[i].CREDIT_TOTAL_CALL).replace("NGN",'') 
      res.data.alldata[i].DEBIT_TOTAL_CALL=formatter.format(res.data.alldata[i].DEBIT_TOTAL_CALL).replace("NGN",'')
      res.data.alldata[i].GRP_BY_DATE=new Intl.DateTimeFormat('en-NG').format(new Date(res.data.alldata[i].GRP_BY_DATE))
      
     
      setState({
        data:res.data.alldata,
        credittotal:formatter.format(allcredittotalcall).replace("NGN",'') ,
        debittotal:formatter.format( allcredittotaldebit).replace("NGN",'') ,
        transtotal:res.data.alldata.length,
        transdifference:formatter.format(allcredittotalcall-allcredittotaldebit).replace("NGN",'') ,
        transactionInputters:res.data.transactionInputters
     
      })
    }
  
    
    // alert(`formatttttttttttttttt                    ${formatter.format(2500).replace("NGN",'')}`) ;
  }).finally(()=>{
    // setLoading(false);
  })
 
}


async function handleTransactionLimit(e){
  setTransLimit({
    [e.target.name]:([e.target.value])
  })
}

async function sendTransactionLimit(){
  let data =new FormData();
    data.append("minimal",parseInt(translimit.minimal))
    // data.append("minimal",translimit.maximal)
  // data.append("csrfmiddlewaretoken",'{{csrf_token}}')

 
  await axios.post("http://127.0.0.1:8000/callover/index/",data).then(res=>{
    alert(`allll           ${(JSON.stringify(res.data.alldata))}`)
    var allcredittotalcall=0,allcredittotaldebit=0
    for (var i=0;i<res.data.alldata.length;i++){

      allcredittotalcall+=parseInt(res.data.alldata[i].CREDIT_TOTAL_CALL)
      allcredittotaldebit+=parseInt(res.data.alldata[i].DEBIT_TOTAL_CALL)
        if (!JSON.stringify(res.data.transactionInputters).includes('All Users'))
          res.data.transactionInputters.push({'IC4PROBRANCHCODE': 'All Users', 'IC4PROINPUTTER': 'All Users',
          'PROFILE_NAME': 'All Users'})
      
      
      setState({
    
        credittotal:formatter.format(allcredittotalcall).replace("NGN",'') ,
        debittotal:formatter.format( allcredittotaldebit).replace("NGN",'') ,
        transtotal:res.data.alldata.length,
        transdifference:formatter.format(allcredittotalcall-allcredittotaldebit).replace("NGN",'') ,
        transactionInputters:res.data.transactionInputters
      })
    }
    for (var i=0;i<res.data.alldata.length;i++){
      res.data.alldata[i].CREDIT_TOTAL_CALL=formatter.format(res.data.alldata[i].CREDIT_TOTAL_CALL).replace("NGN",'') 
      res.data.alldata[i].DEBIT_TOTAL_CALL=formatter.format(res.data.alldata[i].DEBIT_TOTAL_CALL).replace("NGN",'')
      res.data.alldata[i].GRP_BY_DATE=moment().format('YYYYMMDD')
      
     if (JSON.stringify(res.data.alldata.length)!=="[]"){
      setState({
       
        data:res.data.alldata,
        credittotal:formatter.format(allcredittotalcall).replace("NGN",'') ,
        debittotal:formatter.format( allcredittotaldebit).replace("NGN",'') ,
        transtotal:res.data.alldata.length,
        transdifference:formatter.format(allcredittotalcall-allcredittotaldebit).replace("NGN",'') ,
        transactionInputters:res.data.transactionInputters
     
      })
      setthereisdata(true)
     }
     else{
       setthereisdata(false)
      setState({
        
        data:[...[]],
        credittotal:[...[]] ,
        debittotal:[...[]] ,
        transtotal:[...[]],
        transdifference:[...[]] ,
        transactionInputters:res.data.transactionInputters
     
      })
     }

    //  alert(`formatttttttttttttttt                    ${state.data} `)
      
    }
  
    
    alert(`formatttttttttttttttt                    ${thereisdata}`) ;
  }).finally(()=>{
    // setLoading(false);
  })
}

  return (
    <>


      <div className="card"
        style={{
          marginBottom: '0',
          border: "none"
        }}>
        <Row>
          <Col xs={4} >
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >

              <Button
                style={{
                  marginLeft: '0.5rem',
                  background: "#C1C1C1",
                  display: "inline-block",
                  padding: "6px",
                  paddingLeft: '2px',
                  borderRadius: "3px",
                  border: 0
                }}
                onClick={() => setHelpMessage(true)}>

                BSM Callover

                      </Button>

            </OverlayTrigger>
          </Col>
         
          <Col xs={8} >
            <Row >
              <div style={{ width: "6.2rem" }}></div>

              <Col style={{ padding: '0' }}>
                <button type="submit" style={{
                  fontSize: "14px",
                  float: 'right',
                  width: '7.5rem',
                  background: "#66BB6A",
                  color: "white",
                  border: 'none',
                  borderRadius: '12px',
                }}
                  onClick={() => setDashboardChart(true)}>
                  Total trans
            <br />
                  <small style={{ fontSize: "12px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>{state.transtotal}</small>
                </button>
              </Col>

              <Col style={{ padding: '0' }}>
                <button type="submit" style={{ fontSize: "14px", float: 'right', width: '7.5rem', background: "#42A5F5", color: "white", border: 'none', borderRadius: '2px' }}>
                  Total credit
            <br />
                  <small style={{ fontSize: "12px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>{state.credittotal}</small>
                </button>
              </Col>

              <Col style={{ padding: '0' }}>
                <button type="submit" style={{ fontSize: "14px", float: 'right', width: '7.5rem', background: "#F8A316", color: "white", border: 'none', borderRadius: '2px' }}
                >

                  Total debit
            <br />
                  <small style={{ fontSize: "12px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>{state.debittotal}</small>
                </button>
              </Col>


              <Col style={{ paddingTop: '0', paddingBottom: '0', paddingLeft: '0', paddingRight: '10px' }}>
                <button type="submit" style={{ fontSize: "14px", float: 'right', width: '7.5rem', background: "#E63A3A", color: "white", border: 'none', borderRadius: '2px' }}
                >

                  Difference
            <br />
                  <small style={{ fontSize: "12px", marginLeft: '8px', marginTop: '0.006em', color: "white", padding: "0" }}>{state.transdifference}</small>
                </button>
              </Col>


            </Row>


          </Col>
       
       
        </Row>
      </div>

      <div className="card" style={{ paddingBottom: '0', marginLeft: '1.7rem', width: '74.5rem', padding: '0.2em', border: "none", marginBottom: '0' }}>
        <div className="font-weight-bold"
          style={{
            backgroundColor: "#DFF0D8",
            color: "black", padding: "1px", maxHeight: "1.5rem"
          }}> Record Information :
          <span style={{ color: '#787B78', fontSize: '13px' }}>
            The table below shows the following details </span></div>
      </div>

      <div className="card" style={{ border: "none", }}>
        <Row className="mb-3" xl  >
          <Col sm={6} lg={6} xl={4}>

            <ButtonGroup size="sm">
              <Button
                size="sm"
                name="create"
                style={{
                  backgroundColor: '#74C687',
                  color: '#ffffff',
                  border: 0,
                  width: '4rem',
                  fontSize: '0.8em',
                  height: '1.8rem',
                  borderRadius: '4px',
                  marginLeft: '0.5rem',
                  marginRight: '0.5rem',
                  padding: '2px 2px 2px 2px'
                }}
                disabled={!state.selectedData}
                onClick={() => setPatternDistriDetail(true)}
              >
                Detail
                </Button>

              <Button
                size="sm"
                className="ml-2"
                name="edit"
                style={{
                  backgroundColor: '#237163',
                  width: '5rem',
                  border: 0,
                  fontSize: '0.8em',
                  height: '1.8rem',
                  marginRight: '0.5rem',
                  borderRadius: '8px',
                  padding: '2px 2px 2px 2px'
                }}
                onClick={() => setGrouping(true)}
              >
                Classification
                </Button>

              <Button
                size="sm"
                className="ml-1"
                name="view"
                style={{
                  backgroundColor: '#7E2506',
                  width: '4.5rem',
                  border: 0,
                  fontSize: '0.8em',
                  height: '1.8rem',
                  marginRight: '0.5rem',
                  borderRadius: '8px',
                  padding: '2px 2px 2px 2px'
                }}
                onClick={() => setDistribution(true)}
              >
                Distribution
                </Button>



              <Dropdown as={ButtonGroup}
                className="ml-3"
                style={{ padding: "0", marginLeft: "0.5rem", border: 0, width: "18px" }}
              >
                <Dropdown.Toggle
                  variant="primary btn-md"
                  id="dropdown-basic"
                  style={{ backgroundColor: 'purple', width: '3.6rem', fontSize: '0.7em', height: '1.8rem', borderRadius: '4px', border: 0, }}>
                  More</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => setPatternDistri(true)}>
                    1. Pattern and Distribution Analysis
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>



            </ButtonGroup>




          </Col>


          <Col sm={6} lg={6} xl={3} className="ml-3">
            <Dropdowns 
              options={state.transactionInputters}
              optionLabel={option=>option.IC4PROINPUTTER}
              optionValue={option=>option.IC4PROINPUTTER}
              placeholder="All Users"
              onChange={handleTransactionInputter}
              value={allusersdropdown}
              // optionGroupLabel={option=>option.IC4PROINPUTTER}
              style={{ width: '10rem' }} />
          </Col>
          <Col sm={6} lg={6} xl={3} className="ml-3">
            <Row>
              <Col style={{ paddingRight: '-2rem', marginLeft: '-9rem' }}>
                <InputText
                  style={{ width: '7rem' }}
                  type="number"
                  name="minimal"
                  onChange={handleTransactionLimit}
                  value={translimit.minimal}
                  placeholder="Min" />
              </Col>
             
              <Col style={{}}>
                <h6 style={{ marginLeft: '-2rem', marginBottom: '-2rem' }}>To</h6>
              </Col>
              <Col style={{ paddingRight: '0', paddingLeft: '0', marginLeft: '-7rem' }}>
                <InputText
                  style={{ width: '7rem' }}
                  type="search"
                  name="maximal"
                  onChange={handleTransactionLimit}
                  value={translimit.maximal}
                  placeholder="Max" />
              </Col>
              <Col style={{ paddingRight: '-2rem', marginRight: '-3rem' }}>
              <Button
                size="sm"
                name="filter"
                style={{
                  backgroundColor: '#74C687',
                  color: '#ffffff',
                  border: 0,
                  width: '4rem',
                  fontSize: '0.8em',
                  height: '1.8rem',
                  borderRadius: '4px',
                  marginLeft: '0.5rem',
                  marginRight: '0.5rem',
                  padding: '2px 2px 2px 2px'
                }}
                
                onClick={sendTransactionLimit}
              >
                Filter
                </Button>
                </Col>
              
            </Row>
          </Col>


          <Col >
            <Button
              size="sm"
              className="ml-1"
              style={{
                width: '7rem',
                fontSize: '0.7em',
                float: 'right',
                height: '1.8rem',
                backgroundColor: "#0000FF",
                border: 'none'
              }}
              onClick={() => setExportData(true)}
            >

              Export/Download
              </Button>

          </Col>


        </Row>



        <Row>
          <Col>
         
            <Table
            data={state.data}
            selectData={selectData}
            selectedData={state.selectedData}
            filter={filter.globalFilter}
            grouping={grouping}
          />
           
            
          </Col>
        </Row>



      </div>

      <Form
        show={state.showForm}
        handleForm={handleForm}
        submitForm={submitForm}
        mode={state.mode}
        selectedData={state.selectedData}
        deleteData={deleteData}
      />

      <Modal
        show={historyModal}
        backdrop="static"
        keyboard={false}
        onHide={handleHistoryClose}
        dialogClassName="modal-90w"

      // aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton={false} style={{ backgroundColor: "#DFF0D8", padding: "0 0", color: '#EEF8F0' }}>
          <Modal.Title id="example-custom-modal-styling-title" style={{ background: "#28A745", display: "inline-block", padding: '2px' }}>
            FAIN History
              </Modal.Title>
          <Row>
            <div style={{ marginRight: '4rem' }}>
              <Button
                variant="success"
                size="sm"
                className="border border-white ml-1"
                onClick={handleHistoryClose}
                style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
              >
                Close
              </Button>
            </div>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <HistoryModal />
        </Modal.Body>
      </Modal>

      <Modal
        show={activityModal}
        onHide={handleActivityClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton={false} style={{ backgroundColor: "#DFF0D8", padding: "0 0", color: '#EEF8F0' }}>
          <Modal.Title id="example-custom-modal-styling-title" style={{ background: "#28A745", display: "inline-block", padding: '2px' }}>
            FAIN Activity
              </Modal.Title>
          <Row>
            <div style={{ marginRight: '4rem' }}>
              <Button
                variant="success"
                size="sm"
                className="border border-white ml-1"
                onClick={handleActivityClose}
                style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
              >
                Close
              </Button>
            </div>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <ActivityModal />
        </Modal.Body>
      </Modal>

      <Modal
        show={recordsDeleteModal}
        onHide={handleRecDelClose}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton={false} style={{ backgroundColor: "#DFF0D8", padding: "0 0", color: '#EEF8F0' }}>
          <Modal.Title id="example-custom-modal-styling-title" style={{ background: "#28A745", display: "inline-block", padding: '2px' }}>
            FAIN Deleted
              </Modal.Title>
          <Row>
            <div style={{ marginRight: '4rem' }}>
              <Button
                variant="success"
                size="sm"
                className="border border-white ml-1"
                onClick={handleRecDelClose}
                style={{ maxWidth: '4rem', maxHeight: '2rem', marginRight: '6px', marginTop: '3px' }}
              >
                Close
              </Button>
            </div>
          </Row>
        </Modal.Header>
        <Modal.Body>
          <RecordsDeleteModal />
        </Modal.Body>
      </Modal>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color: 'white'
        }}>Classification Analysis</span>}
        visible={grouping}
        onHide={handleGroupClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <Table
          data={state.rawdata}
          selectData={selectData}
          selectedData={state.selectedData}
          filter={filter.globalFilter}
          grouping={grouping}
        />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color: 'white'
        }}>Distribution Analysis</span>}
        visible={distribution}
        onHide={handleDistributionClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <DistributionAnalysis />
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color: 'white'
        }}>Pattern and Distribution Analysis</span>}
        visible={patternDistri}
        onHide={handlePatternDistriClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <PatternDistribution />

      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color: 'white'
        }}>CallOver Detail</span>}
        visible={patternDistriDetail}
        onHide={handlePatternDistriDetailClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <PatternDistributionDetail />

      </Dialog>


      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color: 'white'
        }}>Export Data</span>}
        visible={exportData}
        onHide={handleExportDataClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        <ExportData dataset={state.data} />

      </Dialog>


      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color: 'white'
        }}>Call-Over Message</span>}
        visible={helpMessage}
        onHide={handleHelpMessageClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        Message from Catalog
      </Dialog>

      <Dialog
        header={<span style={{
          padding: '10px',
          background: 'blue',
          color: 'white'
        }}>Call-Over Dashboard</span>}
        visible={dashboardChart}
        onHide={handleDashboardChartClose}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '90vw' }}>
        Chart Goes Here
      </Dialog>

    </>
  )
}

export default IC4Pro_Callover;