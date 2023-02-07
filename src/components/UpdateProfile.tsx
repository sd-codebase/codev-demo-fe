import React, { useEffect, useState } from 'react'
import { Button, Modal, Typography } from 'antd';
const { Title } = Typography;


const UpdateProfile = (props: any) => {
    const {handleModalClosed} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, updateStatus] = useState({} as IStatus);
    const [author, setAuthor] = useState({} as any);
    const [quote, setQuote] = useState({} as any);

    const showModal = () => {
        setIsModalOpen(true);

        updateStatus({...status, isInProgress: true, currentTask: 'author'});
        setTimeout(() => {
            updateStatus({...status, isInProgress: true, authorTask: 'Completed', currentTask: 'the quote'});
            setAuthor({id: 1, name: 'Author 1'});
        }, 5000);
        setTimeout(() => {
            updateStatus({...status, isInProgress: false, authorTask: 'Completed', quoteTask: 'Completed', currentTask: 'Completed'});
            setQuote({id: 1, name: 'Here is the quote'})
        }, 10000);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
      handleModalClosed({result: `Author: ${author.name} Quote: ${quote.name}`})
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
      handleModalClosed({result: "Request cancelled"})
    };
  
    return (
      <>
        <Button type="primary" onClick={showModal}>
          Update
        </Button>
        <Modal open={isModalOpen} footer={null} closable={false}>
            <Title level={1}>Requesting {status?.currentTask}</Title>
            <p>Step 1: Requesting author.. {status?.authorTask}</p>
            <p>Step 2: Requesting quote.. {status?.quoteTask}</p>
            {
                status?.isInProgress ? (
                    <Button type="primary" onClick={handleCancel}>
                        Cancel
                    </Button>
                ) : (
                    <Button type="primary" onClick={handleOk}>
                        Ok
                    </Button>
                )
            }
        </Modal>
      </>
    );
}

export default UpdateProfile;

interface IStatus {
    currentTask: string,
    authorTask: string,
    quoteTask: string,
    isInProgress: boolean,
}