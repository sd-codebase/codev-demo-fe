import React, { useEffect, useState } from 'react'
import { Button, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../constants/api.constants';
const { Title } = Typography;


const UpdateProfile = (props: any) => {
    const {handleModalClosed} = props;
    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, updateStatus] = useState({} as IStatus);
    const [author, setAuthor] = useState({} as any);
    const [quote, setQuote] = useState({} as any);
    const [controller, setController] = useState(new AbortController());

    useEffect(() => {
        setController(new AbortController());
        updateStatus({} as IStatus);
        setAuthor({});
        setQuote({});
    }, [handleModalClosed]);

    const showModal = () => {
        setIsModalOpen(true);
        setTimeout(() => {startAsyncOperations()});
    };

    async function startAsyncOperations() {
        updateStatus({...status, isInProgress: true, currentTask: 'author'});
        const authorResult = await fetch(`${API.HOST}/author?token=${auth.token}`, { signal: controller.signal });
        var {success, data} = await authorResult.json() as any;
        if (success) {
            updateStatus({...status, isInProgress: true, authorTask: 'Completed', currentTask: 'the quote'});
            setAuthor(data);
        }
    
        const quoteResult = await fetch(`${API.HOST}/quote?token=${auth.token}&authorId=${data.authorId}`, { signal: controller.signal });
        var {success, data} = await quoteResult.json() as any;
        if (success) {
            updateStatus({...status, isInProgress: false, authorTask: 'Completed', quoteTask: 'Completed', currentTask: 'finished'});
            setQuote(data);
        }
    }
  
    const handleOk = () => {
        setIsModalOpen(false);
        handleModalClosed({result: `Author: ${author.name} Quote: ${quote.quote}`});
    };
  
    const handleCancel = () => {
        controller.abort();
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
                        OK
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