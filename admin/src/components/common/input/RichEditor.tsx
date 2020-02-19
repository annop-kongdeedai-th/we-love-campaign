import React from 'react';
import { inject, observer } from 'mobx-react';
import { IAppModel } from 'AppModel';
import { COLORS } from '../../../constants';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

interface IRichEditor {
  value: string;
  onChange: (value: string) => void;
  appStore?: IAppModel;
}

@inject('appStore')
@observer
class RichEditor extends React.Component<IRichEditor> {
  state = { editorState: undefined };

  componentDidMount() {
    const { value } = this.props;
    // console.log('RichEditor didmount', value);

    const blocksFromHtml = htmlToDraft(value);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorStateFromHtml = EditorState.createWithContent(contentState);

    this.setState({
      editorState: editorStateFromHtml
    });
  }

  onEditorStateChange = (editorState: any) => {
    const { onChange } = this.props;
    onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.setState({ editorState });
  };

  public render() {
    const {} = this.props;
    return (
      <Editor
        editorState={this.state.editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
        toolbarStyle={styles.toolbarStyle}
        editorStyle={styles.editorStyle}
      />
    );
  }
}

const styles = {
  toolbarStyle: {
    border: `1px solid ${COLORS.lightGrey}`
  },
  editorStyle: {
    backgroundColor: COLORS.white,
    minHeight: 250,
    cursor: 'text',
    border: `1px solid ${COLORS.lightGrey}`
  }
};

export default RichEditor;
