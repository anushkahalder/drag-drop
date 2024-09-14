import { useState } from 'react'

import './App.css'

function App() {
  const [list1, setList1] = useState([]); // Initially empty
  const [list2, setList2] = useState([]); // Initially empty
  const [draggedItem, setDraggedItem] = useState(null);
  const [newItem, setNewItem] = useState(''); // State for the input box

  // Handle drag start event
  const handleDragStart = (item, sourceList) => {
    setDraggedItem({ item, sourceList });
  };

  // Handle drag over event (allow dropping)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop event
  const handleDrop = (targetList) => {
    if (draggedItem) {

      if (targetList === draggedItem.sourceList) {



        // Remove the item from the source list
        const updatedSourceList =
          draggedItem.sourceList === 'list1'
            ? list1.filter((i) => i !== draggedItem.item)
            : list2.filter((i) => i !== draggedItem.item);




        // Add the item to the target list
        const updatedTargetList =
          targetList === 'list1' ? [...updatedSourceList, draggedItem.item] : [...updatedSourceList, draggedItem.item];

        if (targetList === 'list1') {
          setList1(updatedSourceList);

          setList1(updatedTargetList);


        } else {
          setList2(updatedSourceList);
          setList2(updatedTargetList);
        }
      }
      else {
        console.log("else condition")
        // Remove the item from the source list
        const updatedSourceList =
          draggedItem.sourceList === 'list1'
            ? list1.filter((i) => i !== draggedItem.item)
            : list2.filter((i) => i !== draggedItem.item);

        // Add the item to the target list
        const updatedTargetList =
          targetList === 'list1' ? [...list1, draggedItem.item] : [...list2, draggedItem.item];

        // Update the state based on the lists involved
        if (targetList === 'list1') {
          setList1(updatedTargetList);
          setList2(updatedSourceList);
        } else {
          setList1(updatedSourceList);
          setList2(updatedTargetList);
        }
      }


      setDraggedItem(null);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
      setNewItem(e.target.value);
   
  };

  const handleKey =(e) =>{
    if(e.key === "Enter"){
      if (newItem.trim()) {
        setList1([...list1, newItem.trim()]); // Add the new item to list1
        setNewItem(''); // Clear the input box
      }
    }

  }

  // Handle adding new item to list1
  const addItemToList1 = () => {
    if (newItem.trim()) {
      setList1([...list1, newItem.trim()]); // Add the new item to list1
      setNewItem(''); // Clear the input box
    }
  };

  return (
    <div className="container">
      {/* Input box for adding items to list1 */}
      <div className="input-container">
        <input
          type="text"
          value={newItem}
          onChange={handleInputChange}
          onKeyDown={handleKey}
          placeholder="Type a new item for List 1 and press Enter to add it."
          className="input-box"
        />
       
      </div>

      {/* Lists in a flex container */}
      <div className="lists-container">
        {/* List 1 */}
        <div
          className="list"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('list1')}
        >
          <h3>List 1</h3>
          {list1.length === 0 ? <p>No items</p> : list1.map((item) => (
            <div
              key={item}
              draggable
              onDragStart={() => handleDragStart(item, 'list1')}
              className="list-item"
            >
              {item}
            </div>
          ))}
        </div>

        {/* List 2 */}
        <div
          className="list"
          onDragOver={handleDragOver}
          onDrop={() => handleDrop('list2')}
        >
          <h3>List 2</h3>
          {list2.length === 0 ? <p>No items</p> : list2.map((item) => (
            <div
              key={item}
              draggable
              onDragStart={() => handleDragStart(item, 'list2')}
              className="list-item"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}

export default App
