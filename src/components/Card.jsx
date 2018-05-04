import React from 'react';
import { Card, Icon, Popconfirm } from 'antd';
import Modal from './Modal';
const { Meta } = Card;

class CardItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editVisible: false,
			title: '',
		};
	}

	// Delete
	handleDeleteOK = e => {
		console.log('Clicked ok button');
		this.setState({
			deleteVisible: false,
		});
	};
	handleDeleteCancel = e => {
		console.log('Clicked cancel button');
		this.setState({
			deleteVisible: false,
		});
	};

	// Edit
	showEditModal = () => {
		this.setState({ editVisible: true });
	};
	handleEditOK = e => {
		console.log('Clicked ok button');
		this.setState({
			editVisible: false,
		});
	};
	handleEditCancel = e => {
		console.log('Clicked cancel button');
		this.setState({
			editVisible: false,
		});
	};

	handleEdit = () => {
		const form = this.formRef.props.form;
		form.validateFields((err, values) => {
			if (err) {
				return;
			}

			fetch('http://localhost:3000/api', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})
				.then(response => response.json())
				.then(data => console.log(data))
				.catch(err => console.err(err));
			form.resetFields();
			this.setState({ editVisible: false });
		});
	};
	saveFormRef = formRef => {
		this.formRef = formRef;
	};

	render() {
		return (
			<Card
				cover={
					<img
						alt={this.props.title}
						src={this.props.infoCard.images}
						height="225"
						width="348"
					/>
				}
				actions={[
					<Icon
						type="edit"
						style={{ color: 'blue' }}
						onClick={this.showEditModal}
					/>,
					<Popconfirm
						title="Are you sure delete this card?"
						onConfirm={this.handleDeleteOK}
						onCancel={this.handleDeleteCancel}
						okText="Yes"
						cancelText="No"
					>
						<Icon type="delete" style={{ color: 'red' }} />
					</Popconfirm>,
				]}
			>
				<Meta
					title={this.props.infoCard.title}
					description={this.props.infoCard.description}
				/>
				<Modal
					wrappedComponentRef={this.saveFormRef}
					visible={this.state.editVisible}
					onOk={this.handleEdit}
					onCancel={this.handleEditCancel}
					titleModal="Edit"
				/>
			</Card>
		);
	}
}

export default CardItem;
