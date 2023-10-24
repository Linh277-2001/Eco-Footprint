import React, { useState } from 'react';
import { Calendar, Modal } from 'antd';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    // Do something with the selected date
    console.log(selectedDate);
  };

  return (
    <div>
      <Calendar onSelect={handleDateClick} />
      <Modal
        title="Selected Date"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalClose}
      >
        {selectedDate && <p>Selected date: {selectedDate.format('YYYY-MM-DD')}</p>}
      </Modal>
    </div>
  );
};

export default CalendarPage;