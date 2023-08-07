import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { AppBar, Toolbar, Typography, Container, TextField, Button, Paper, Box, Divider } from '@mui/material';
import { createContact } from '../../redux/slice/contact';
import { useNavigate } from 'react-router-dom';
function Form() {
    const [categories, setCategories] = useState(['text', 'Checkbox', 'blank']);
    const [questions, setQuestions] = useState([]);
    const dispatch =useDispatch() 
  console.log(questions);
  //-->click oepations
    const handleAddQuestion = (type) => {
      const newQuestion = {
        type,
        question: '',
        options: type === 'mcq' ? ['', ''] : [],
        category: '',
        underlineWords: type === 'fill-in-the-blank' ? [] : [],
      };
      setQuestions([...questions, newQuestion]);
    };
  
   
    const handleAddOption = (questionIndex) => {
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].options.push('');
      setQuestions(updatedQuestions);
    };
  
    const handleOptionChange = (questionIndex, optionIndex, value) => {
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      setQuestions(updatedQuestions);
    };
  
    const handleCategoryChange = (questionIndex, value) => {
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].category = value;
      setQuestions(updatedQuestions);
    };
  
    const handleQuestionChange = (questionIndex, value) => {
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].text = value;
      setQuestions(updatedQuestions);
    };
    const handleUnderlineWordsChange = (questionIndex, value) => {
        const updatedQuestions = [...questions];
        const underlineWords = value.split(',').map((word) => word.trim());
        updatedQuestions[questionIndex].underlineWords = underlineWords;
        setQuestions(updatedQuestions);
      };
      //-->connection to data base
      const field = questions && questions.flatMap((item)=>{
        return[
          {question:item.text,
            type:item.type,
            options:[...item?.options],
category:item.category,
underlineWords: [...item.underlineWords]
          }
        ]
      }) 
      console.log(field)
      const handleSaveToMongoDb = async()=>{
const result = await dispatch(createContact({fields:field}))
window.location.reload();
// console.log(result);
      }
//-->Nevigation

const nevigate = useNavigate();
const handleNevigate = ()=>{
  nevigate('/preview');
}

  return (
    <>
     <AppBar position="static" sx={{backgroundColor:'#1699C3',textAlign:'center',}}>
        <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
          <Typography variant="h6" sx={{textAlign:'center'}}>Form Editor</Typography>
          <Button sx={{boxShadow:"none",backgroundColor:"#1699C3"}} variant='contained' onClick={handleNevigate}>Preview</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '40px' }}>
        <Typography sx={{}}>Before Preview first create quetions </Typography>
        <Typography variant="h5" gutterBottom>
          Form Editor
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleAddQuestion('categorized')}>
          Add Categorized Question
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleAddQuestion('fill-in-the-blank')} style={{ marginLeft: '10px' }}>
          Add Fill-in-the-Blank Question
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleAddQuestion('mcq')} style={{ marginLeft: '10px' }}>
          Add MCQ Question
        </Button>
        <Divider style={{ margin: '20px 0' }} />
        {questions.map((question, index) => (
          <Box key={index} mb={2}  padding={2}>
            {question.type === 'categorized' && (
              <>
                <TextField
                  label="Categorized Question Text"
                  fullWidth
                  margin="normal"
                  multiline
                  value={question.text}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
                 <Typography variant="subtitle1">Category:</Typography>
                <select
                  value={question.category}
                  onChange={(e) => handleCategoryChange(index, e.target.value)}
                  style={{height:"40px",width:'150px',padding:'10px'}}
                >
                  <option value="" style={{}}>Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </>
            )}
              {  question.category!=="text"?<Typography  sx={{paddingY:"10px"}}>Options:</Typography>:<></>}
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <TextField
                      label={`Option ${optionIndex + 1}`}
                      fullWidth
                      margin="normal"
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    />
                 
                    <Divider style={{ margin: '10px 0' }} />
                  </div>
                ))}
               {  question.category!=="text"?    <Button variant="outlined" color="primary" onClick={() => handleAddOption(index)}>
                      Add Option
                    </Button>:<></>}
            {question.type === 'fill-in-the-blank' && (
              <>
                <TextField
                  label="Fill-in-the-Blank Question Text"
                  fullWidth
                  margin="normal"
                  multiline
                  value={question.text}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
                <Typography variant="subtitle1">Underline the Words to Convert to Blanks</Typography>
                <TextField
                  label="Underline Words"
                  fullWidth
                  margin="normal"
                  value={question.underlineWords.join(', ')}
                  onChange={(e) => handleUnderlineWordsChange(index, e.target.value)}
                  helperText="Separate words with commas"
                />
              </>
            )}
            {question.type === 'mcq' && (
              <>
                <TextField
                  label="MCQ Question Text"
                  fullWidth
                  margin="normal"
                  multiline
                  value={question.text}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
                <Typography variant="subtitle1">Options:</Typography>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <TextField
                      label={`Option ${optionIndex + 1}`}
                      fullWidth
                      margin="normal"
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    />
                   
                    <Divider style={{ margin: '10px 0' }} />
                  </div>
                ))}
                 <Button variant="outlined" color="primary" onClick={() => handleAddOption(index)}>
                      Add Option
                    </Button>
              </>
            )}
          </Box>
        ))}
      {questions&&questions.length>0? <Button variant="contained" color="primary" onClick={handleSaveToMongoDb}>
          Save to MongoDB
        </Button>:<Button variant="contained" color="primary"  disabled>
          Save to MongoDB
        </Button>} 
      </Container>
    </>
  )
}

export default Form