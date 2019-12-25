import React, { Component } from "react";
import {
    Modal,
    ModalBody,
    ModalFooter
} from "reactstrap";

class ViewClient extends Component {
    constructor() {
        super();
        this.state = {
            listName: "",
            cardName: "",
            editCardName: "",
            keyCard: "",
            keyList: "",
            inputKey: "",
            clientList: [],
            editing: false
        };
    }

    _handleEdit = () => {
        const { editCardName, keyCard, keyList } = this.state;
        // console.log(editCardName);
        // console.log(keyCard);

        if (editCardName !== "") {
            // console.log("You can edit");

            fire
                .database()
                .ref("cards/")
                .update({
                    [keyCard]: {
                        cardName: editCardName,
                        listKey: keyList
                    }
                });
        } else {
            // console.log("You can't edit");
            alert("Card cannot be empty");
        }
    };

    toggle = e => {
        this.setState(prevState => ({
            editing: !prevState.editing
        }));
    };

    _handleChooseCard = key => {
        // console.log(key);
        const { dataCards } = this.state;
        // console.log(dataCards);
        let indexOfCard;
        for (let i = 0; i < dataCards.length; i++) {
            if (key === dataCards[i].key) {
                // console.log(dataCards[i].cardName);
                indexOfCard = i;
            }
        }

        const editCard = dataCards[indexOfCard];
        // console.log(editCard.cardName);

        this.setState({
            editCardName: editCard.cardName,
            keyCard: key,
            keyList: editCard.listKey
        });
    };

    render() {
        return (
            <div className="container">
                <Modal
                    isOpen={this.state.editing}
                    toggle={this.toggle}
                    className={this.props.className}
                >
                    <ModalBody>
                        <input
                            type="text"
                            name="editCardName"
                            value={this.state.editCardName}
                            onChange={this._handleChange}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={() => {
                                this._handleEdit();
                                this.toggle();
                            }}
                        >
                            Edit
                        </Button>
                        <Button color="secondary" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Data;