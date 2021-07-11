let offsetX, offsetY;
const move = (e) => {
  const el = e.target;
  el.style.left = `${e.pageX - offsetX}px`;
  el.style.top = `${e.pageY - offsetY}px`;
};
const add = (e) => {
  const el = e.target;
  offsetX = e.clientX - el.getBoundingClientRect().left;
  offsetY = e.clientY - el.getBoundingClientRect().top;
  el.addEventListener("mousemove", move);
};
const remove = (e) => {
  const el = e.target;
  el.removeEventListener("mousemove", move);
};

//////////////////////////////////////////////////

const [listData, setListData] = useState(lists);
const [dragging, setDragging] = useState(false);
const dragList = useRef();
const drageNode = useRef();

useEffect(() => {
  setListData(lists);
}, [lists]);

const handleOnDragStart = (e, listIndex) => {
  console.log("darg start", e);
  dragList.current = listIndex;
  drageNode.current = e.target;
  drageNode.current.addEventListener("dragend", handleDragEnd);
  setTimeout(() => {
    setDragging(true);
  }, 0);
};
const handleOnDragEnter = (e, listIndex) => {
  let currentItem = dragList.current;
  // dragAndDropList(listId);
  if (e.target !== drageNode.current) {
    console.log(" target is not the same");
    setListData((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList));
      newList.splice(listIndex, 0, newList.splice(currentItem, 1)[0]);
      dragList.current = listIndex;
      return newList;
    });
  }
};
const handleDragEnd = (e) => {
  dragList.current = null;
  drageNode.current.removeEventListener("dragend", handleDragEnd);
  setDragging(false);
  drageNode.current = null;
};
const getStyles = (listIndex) => {
  const currentList = dragList.current;
  if (currentList === listIndex) {
    return "dragging-list";
  }
  return "list";
};
