import './App.css';
import BasicTable from './ReportTable';
import { useState, useEffect, Fragment } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';


function App() {

  const [returnedData, setReturnedData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [startDate, setStartDate] = useState(dayjs().year(2023).month(0).date(1))
  const [endDate, setEndDate] = useState(dayjs().year(2023).month(11).date(31))
  const [numberConsig, setNumberConsig] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const realStartMonth = ((''.concat(startDate.month()+1)).length) === 1 ? '0'.concat(startDate.month()+1) : startDate.month()+1
    const realStartDate = ((''.concat(startDate.date())).length) === 1 ? '0'.concat(startDate.date()) : startDate.date()
    
    const realEndMonth = ((''.concat(endDate.month()+1)).length) === 1 ? '0'.concat(endDate.month()+1) : endDate.month()+1
    const realEndDate = ((''.concat(endDate.date())).length) === 1 ? '0'.concat(endDate.date()) : endDate.date()
    
   
    
    const startDateFetch = startDate ? `startDate=${startDate.year()}${realStartMonth}${realStartDate}` : '';
    const endDateFetch = endDate ? `endDate=${endDate.year()}${realEndMonth}${realEndDate}` : '';
    
    console.log(startDateFetch)
    console.log(endDateFetch)

    fetch(`http://localhost:5000/?id=${numberConsig}&${startDateFetch}&${endDateFetch}`)
      .then(res => res.json())
      .then((json) => {
        setReturnedData(json);
        console.log(returnedData)
      })
      .catch((err) => {
        console.warn(err);
        alert("Не удалось получить данные");
      })
      .finally(() => setIsLoading(false))


  }, [isSubmit]);
  
  return (
    <Fragment>
      <h1>Отчет по показателям качества</h1>
      <Fragment>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker sx={{margin: '10px'}} label="Диапазон дат от" value={startDate} onChange={e => {setStartDate(e); console.log(startDate)}}/>
          <DatePicker sx={{margin: '10px'}} label="Диапазон дат до" value={endDate} onChange={e => setEndDate(e)}/>
        </LocalizationProvider>
        <TextField sx={{margin: '10px'}} label="Номер партии" onChange={e => setNumberConsig(e.target.value)}/>
        <Button sx={{margin: '20px 10px 10px 10px'}} variant="outlined" onClick={() => setIsSubmit(!isSubmit)}>Создать отчет</Button>
      </Fragment>
      
      <div className="App">
      

      <div style={{ height: '100%', width: '100%'}}>
        
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ):(
          
          <BasicTable
          data = {returnedData}
          />
        )}
      </div>
    </div>
    </Fragment>
    
  );
}

export default App;
