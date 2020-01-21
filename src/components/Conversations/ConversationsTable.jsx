import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { SearchField } from 'uiKit/userInput/TextField';
import ConvoItem from './ConvoItem';

// fix this
const WrapperOuter = styled.div`
    /* background-color: lightpink; */
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    overflow: scroll;
`
const WrapperInner = styled.div`
    /* background-color: lightyellow; */
    width: 25.5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin: 60px 2.3vw 0 12.5vw;
`

const WrapperSearchField = styled.div`
  /* background-color: whitesmoke; */
  width: 23.2vw;
  height: 4.22vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 17px;
`

const WrapperConvoItems = styled.div`
    /* background-color: lightgreen; */
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
`

const ConversationsTable = ({ userConvos, admin, getCurrentMessages, currentMessagesLength }) => {
    const [searchState, setSearchState] = useState('');

    const handleSearchChange = (e) => {
        setSearchState(e.target.value);
        console.log(searchState);
    }

    const filteredUserConvos = userConvos.filter(userConvo => {
        const clientFullName = `${userConvo.participants[0].firstName + ' ' + userConvo.participants[0].lastName}`
        return clientFullName.indexOf(searchState) !== -1;
    });
          
    return (
        <WrapperOuter>
            <WrapperInner>
                <WrapperSearchField label="search" onChange={handleSearchChange}>
                    <SearchField placeholder="Search your conversations" />
                </WrapperSearchField>
                <WrapperConvoItems>
                    {filteredUserConvos.length ? filteredUserConvos.map((userConvo, index) => {
                        return (
                            <ConvoItem 
                                key={index} 
                                userConvo={userConvo} 
                                admin={admin}
                                getCurrentMessages={getCurrentMessages}
                                currentMessagesLength={currentMessagesLength}
                            />
                        )
                    }): null}
                </WrapperConvoItems>
            </WrapperInner>
        </WrapperOuter>
    )
}

export default ConversationsTable;