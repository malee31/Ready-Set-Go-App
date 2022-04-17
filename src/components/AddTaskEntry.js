import React from 'react'

const AddTaskEntry = ({attribute, targetState, caption, placeHolderText}) => {
  return (
      <View>
        <Text style={{ fontSize: 20, marginTop: 20 }}>{caption}</Text>
        <TextInput
            style={{
                fontSize: 20
            }}
            onChangeText={e => setCurrentTask({ ...currentTask, attribute: e })}
            value={targetState}
            placeholder={placeHolderText}
        />
      </View>
    
  )
}

/*
<Text style={{ fontSize: 20, marginTop: 20 }}>Task</Text>
<TextInput
    style={inputStyle}
    onChangeText={e => setCurrentTask({ ...currentTask, task: e })}
    value={currentTask.task}
    placeholder="Enter Task"
/>
*/

export default AddTaskEntry