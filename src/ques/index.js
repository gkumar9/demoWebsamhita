import React, { Component } from "react";
import { Button, Container, Tab, Nav, Row, Col } from "react-bootstrap";
// import Header from "../Header/index"; // If using WebPack and style-loader.
import "./index.css";
import EnglishHQuesTab from "./QuesEnglish.js";
import HindiQuesTab from "./QuesHindi.js";
// import axios from "axios";
// import URL from "../../Assets/url";
const style = {
  textAlign: "center",
  background: "white",
  borderRadius: "2em",
  color: "black",
  padding: " 0.3em 2em",
  letterSpacing: "0.2em"
};
class Ques extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: 0,
      activetab: "english",

      listOfSubjectEnglish: [],
      listOfSubjectHindi: [],
      selectedSubjectID: 0,

      listOfChapterEnglish: [],
      listOfChapterHindi: [],
      selectedChapterID: 0,

      listOfTopicEnglish: [],
      listOfTopicHindi: [],
      selectedTopicID: 0,

      listOfSubTopicEnglish: [],
      listOfSubTopicHindi: [],
      selectedSubTopicID: 0,

      difficulty: "+",
      tags: [],
      suggestions: [],
      apisugges: []
    };
  }

  handleSelect = () => {
    let activetab = this.state.activetab;
    if (activetab === "english") {
      this.setState({ activetab: "hindi" });
    } else {
      this.setState({ activetab: "english" });
    }
  };
  handleChange = data => {
    // console.log("Id from english response", data,this.state.questionId);
    if(data&&this.state.questionId===0){

      this.setState({ questionId: data });
    }else if(data){
      this.setState({ questionId: 0 });
    }
  };
  handlereset=()=>{
    this.setState({ questionId: 0 });
    this.handleSelect();
  }
  onDelete = i => {
    // e.preventDefault()
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  };
  onAddition = tag => {
    // e.preventDefault()
    const tags = [].concat(this.state.tags, tag);
    let suggestions = this.state.apisugges;
    // let tempapisugges = this.state.apisugges;
    this.setState({ tags, suggestions });
  };
  handleDifficultyRadio = e => {
    e.preventDefault();
    console.log('difficulty value',e.target.value);
    this.setState({ difficulty: e.target.value });
  };
  
  handleSubjectChange = e => {
    e.preventDefault();
    if (
      e.target.value.split("").filter(function(char) {
        var charCode = char.charCodeAt();
        return charCode >= 2309 && charCode <= 2361;
      }).length > 0
    ) {
      this.setState(
        {
          selectedSubjectID: this.state.listOfSubjectHindi[
            e.target.options.selectedIndex
          ].subject.subjectId
        },
        () => {
          this.callApiForChapter();
        }
      );
    } else {
      this.setState(
        {
          selectedSubjectID: this.state.listOfSubjectEnglish[
            e.target.options.selectedIndex
          ].subject.subjectId
        },
        () => {
          this.callApiForChapter();
        }
      );
    }
  };
  handleChapterChange = e => {
    e.preventDefault();
    // console.log( e.target.value)
    if (
      e.target.value.split("").filter(function(char) {
        var charCode = char.charCodeAt();
        return charCode >= 2309 && charCode <= 2361;
      }).length > 0
    ) {
      // console.log('hindi')
          console.log(' value',this.state.listOfChapterHindi[
            e.target.options.selectedIndex
          ].subjectSection.sectionId);
      this.setState(
        {
          selectedChapterID: this.state.listOfChapterHindi[
            e.target.options.selectedIndex
          ].subjectSection.sectionId
        },
        () => {
          this.callApiForTopic();
        }
      );
    } else {
      // console.log('english')
      this.setState(
        {
          selectedChapterID: this.state.listOfChapterEnglish[
            e.target.options.selectedIndex
          ].subjectSection.sectionId
        },
        () => {
          this.callApiForTopic();
        }
      );
    }
  };
  handleTopicChange = e => {
    e.preventDefault();
    if (
      e.target.value.split("").filter(function(char) {
        var charCode = char.charCodeAt();
        return charCode >= 2309 && charCode <= 2361;
      }).length > 0
    ) {
      this.setState(
        {
          selectedTopicID: this.state.listOfTopicHindi[
            e.target.options.selectedIndex
          ].subjectTopic.topicId
        },
        () => {
          this.callApiForSubTopic();
        }
      );
    } else {
      this.setState(
        {
          selectedTopicID: this.state.listOfTopicEnglish[
            e.target.options.selectedIndex
          ].subjectTopic.topicId
        },
        () => {
          this.callApiForSubTopic();
        }
      );
    }
  };
  handleSubTopicChange = e => {
    e.preventDefault();
    if (
      e.target.value.split("").filter(function(char) {
        var charCode = char.charCodeAt();
        return charCode >= 2309 && charCode <= 2361;
      }).length > 0
    ) {
      this.setState({
        selectedSubTopicID: this.state.listOfSubTopicHindi[
          e.target.options.selectedIndex
        ].subjectSubtopic.subtopicId
      });
    } else {
      this.setState({
        selectedSubTopicID: this.state.listOfSubTopicEnglish[
          e.target.options.selectedIndex
        ].subjectSubtopic.subtopicId
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        {/* <Header props={this.props} /> */}
        <Container fluid style={{ width: "auto", background: "#EEEEEE" }}>
          <Tab.Container
            activeKey={this.state.activetab}
            onSelect={key => this.handleSelect(key)}
          >
            <Row
              style={{
                padding: "1em 0em",
                borderBottom: "1px solid #cac2c2",
                boxShadow: "-1px 3px 4px -5px rgba(0, 0, 0, 0.75)",
                zIndex: "99",
                position: "relative"
              }}
            >
              {/* <Col lg="3"></Col> */}
              <Col
                lg="1.5"
                // className="customtabcolor"
                style={{
                  margin: "0px 0em 0em 3em"
                }}
              >
                <Nav.Link
                  eventKey="english"
                  style={
                    this.state.activetab === "english"
                      ? style
                      : {
                          color: "dimgrey",
                          letterSpacing: "0.2em",
                          padding: " 0.3em 2em"
                        }
                  }
                >
                  <span style={{ fontSize: "larger" }}>English </span>
                </Nav.Link>
              </Col>
              <Col
                lg="1.5"
                style={{
                  padding: "0 "
                }}
              >
                <Nav.Link
                  eventKey="hindi"
                  style={
                    this.state.activetab === "hindi"
                      ? style
                      : {
                          color: "dimgrey",
                          letterSpacing: "0.2em",
                          padding: " 0.3em 2em"
                        }
                  }
                >
                  <span style={{ fontSize: "larger" }}>Hindi</span>
                </Nav.Link>
              </Col>
              <Col>
                {this.state.questionId !== 0 && this.state.questionId && (
                  <Button
                  onClick={this.handlereset}
                    style={{
                      float: "right",
                      fontSize: "1em",
                      fontWeight: "500",
                      background: "#dad8d8",
                      borderColor: "#dad8d8",
                      borderRadius: "0",
                      marginRight: "3em",
                      color: " #676767"
                    }}
                  >
                    {" "}
                    Skip version
                  </Button>
                )}
              </Col>
            </Row>
            <Tab.Content>
              <Tab.Pane eventKey="english">
                <EnglishHQuesTab
                  questionId={this.state.questionId}
                  handleChange={this.handleChange}
                  handleSelect={this.handleSelect}
                  selectedSubjectID={this.state.selectedSubjectID}
                  selectedChapterID={this.state.selectedChapterID}
                  selectedTopicID={this.state.selectedTopicID}
                  selectedSubTopicID={this.state.selectedSubTopicID}
                  listOfChapter={this.state.listOfChapterEnglish}
                  listOfSubTopic={this.state.listOfSubTopicEnglish}
                  listOfTopic={this.state.listOfTopicEnglish}
                  listOfSubject={this.state.listOfSubjectEnglish}
                  handleChapterChange={this.handleChapterChange}
                  handleSubTopicChange={this.handleSubTopicChange}
                  handleTopicChange={this.handleTopicChange}
                  handleSubjectChange={this.handleSubjectChange}
                  handleChangeTags={this.handleChangeTags}
                  handleDifficultyRadio={this.handleDifficultyRadio}
                  onAddition={this.onAddition}
                  onDelete={this.onDelete}
                  tags={this.state.tags}
                  suggestions={this.state.suggestions}
                  difficulty={this.state.difficulty}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="hindi">
                <HindiQuesTab
                  questionId={this.state.questionId}
                  handleChange={this.handleChange}
                  handleSelect={this.handleSelect}
                  selectedSubjectID={this.state.selectedSubjectID}
                  selectedChapterID={this.state.selectedChapterID}
                  selectedTopicID={this.state.selectedTopicID}
                  selectedSubTopicID={this.state.selectedSubTopicID}
                  listOfChapter={this.state.listOfChapterHindi}
                  listOfSubTopic={this.state.listOfSubTopicHindi}
                  listOfTopic={this.state.listOfTopicHindi}
                  listOfSubject={this.state.listOfSubjectHindi}
                  handleChapterChange={this.handleChapterChange}
                  handleSubTopicChange={this.handleSubTopicChange}
                  handleTopicChange={this.handleTopicChange}
                  handleSubjectChange={this.handleSubjectChange}
                  handleChangeTags={this.handleChangeTags}
                  handleDifficultyRadio={this.handleDifficultyRadio}
                  onAddition={this.onAddition}
                  onDelete={this.onDelete}
                  tags={this.state.tags}
                  suggestions={this.state.suggestions}
                  difficulty={this.state.difficulty}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </React.Fragment>
    );
  }
}


export default Ques;
