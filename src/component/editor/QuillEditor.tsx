import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css';

type props = {
    value: string,
    onChange: () => void
}

const RichTextEditor = (props: props) => {
  return(
    <ReactQuill theme="snow" value={props.value} onChange={props.onChange} style={{height:"100%"}} />
  )
}

export default RichTextEditor