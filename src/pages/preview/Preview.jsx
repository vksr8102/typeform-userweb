import { AppBar, Box, Card, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Preview() {
    const contact = useSelector((state)=>state.contact)
    console.log(contact);
   
    const nevigate = useNavigate()
    const handleNevigate = ()=>{
        nevigate("/")
    }
    // console.log(contact.contact.contact[0].fields);
  return (
    <Box >
<AppBar position="static">
<Toolbar sx={{display:"flex",gap:"30px"}}>
<Typography>Preview</Typography>
<Typography onClick={handleNevigate} sx={{cursor:"pointer"}}>Home</Typography>
</Toolbar>
</AppBar>
{!contact?<>
<Box sx={{display:"flex",justifyContent:"center",alignItems:'center'}}>
<Typography sx={{fontSize:'40px'}}>Nothing To Preview 🙂</Typography>
</Box>
</>:
<Box sx={{display:"flex",alignItems:"center"}}>
<Card sx={{backgroundImage: "linear-gradient(to right, rgb(242, 112, 156), rgb(255, 148, 114))",width:"100%",padding:"30px",borderRadius:"0px"}}>
    {contact&&contact?.contact&&contact?.contact?.contact&&contact?.contact?.contact.length > 0 &&contact?.contact?.contact[0].fields.length>0&&contact.contact.contact[0].fields.map((item)=>(
        <Box>
    <Box>
{item.type==="mcq"?
<>
<Typography sx={{fontSize:"20px",fontWeight:"600"}}>Mcq:</Typography>
<Typography>Question :{item.question}</Typography><br/>
{item.options&&item.options.map((option)=>(
    <>
    <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel value={option} name='mcq' control={<Radio />} label={option} />
      </RadioGroup>
    </>
))}
</>
:<></>}

    </Box>
    <br/>
    <Box>
        {item.type ==="categorized"?
        <>
<Typography sx={{fontSize:"20px",fontWeight:"600"}}>categorized:</Typography>
{item.category==="text"?
<>
<Typography>Question : {item.question}</Typography><br/>
<TextField id="standard-basic" placeholder="Write your ans here...." variant="standard" />
</>
:""
}
{item.category==="blank"?
<>
<Typography>Question : {item.question}</Typography><br/>
{item.options&&item.options.map((option)=>(
    <>
    <Typography variant='order-list'><Checkbox/> {option}</Typography><br/>
    </>
))}
</>
:""
}
{item.category==="Checkbox"?
<>
<Typography>Question : {item.question}</Typography><br/>
{item.options&&item.options.map((option)=>(
    <>
    <Typography variant='order-list'><Checkbox/> {option}</Typography><br/>
    </>
))}
</>
:""
}
        </>:<></>
}
    </Box>
    <br/>
    <Box>
    {item.type==="fill-in-the-blank"?
<>
<Typography sx={{fontSize:"20px",fontWeight:"600"}}>fill-in-the-blank</Typography>
<Typography>Question :{item.question}</Typography><br/> 
<TextField id="standard-basic" placeholder="Write your ans seprated by commas...." variant="standard" /> 
</>
:<></>}
    </Box>
    <br/>
    </Box>
     ))} 
</Card>
</Box>
}
    </Box>
  )
}

export default Preview