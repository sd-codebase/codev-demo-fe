import React, { useEffect, useState } from 'react'
import { Button, Modal, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { API } from '../constants/api.constants';
import { IUserState } from '../models/user.model';
import { IStatus, IAuthor, IQuote } from '../models/profile.model';
const { Title } = Typography;


const UpdateProfile = ({handleModalClosed}: IUpdateProfileProps) => {
    const auth = useSelector((state: IUserState) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, updateStatus] = useState({} as IStatus);
    const [author, setAuthor] = useState({} as IAuthor);
    const [quote, setQuote] = useState({} as IQuote);
    const [controller, setController] = useState(new AbortController());

    useEffect(() => {
        setController(new AbortController());
        updateStatus({} as IStatus);
        setAuthor({}  as IAuthor);
        setQuote({} as IQuote);
    }, [handleModalClosed]);

    const showModal = () => {
        setIsModalOpen(true);
        setTimeout(() => {startAsyncOperations()});
    };

    async function startAsyncOperations() {
        updateStatus({...status, isInProgress: true, currentTask: 'author'});
        const authorResult = await fetch(`${API.HOST}/author?token=${auth.token}`, { signal: controller.signal });
        let {success: isSuccess, data: result} = await authorResult.json();
        if (isSuccess) {
            updateStatus({...status, isInProgress: true, authorTask: 'Completed', currentTask: 'the quote'});
            setAuthor(result);
        }
    
        const quoteResult = await fetch(`${API.HOST}/quote?token=${auth.token}&authorId=${result.authorId}`, { signal: controller.signal });
        let {success, data} = await quoteResult.json();
        if (success) {
            updateStatus({...status, isInProgress: false, authorTask: 'Completed', quoteTask: 'Completed', currentTask: 'finished'});
            setQuote(data);
        }
    }
  
    const handleOk = () => {
        setIsModalOpen(false);
        handleModalClosed(`Author: ${author.name} Quote: ${quote.quote}`);
    };
  
    const handleCancel = () => {
        controller.abort();
        setIsModalOpen(false);
        handleModalClosed("Request cancelled")
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

interface IUpdateProfileProps {
    handleModalClosed: (str: string) => void
}