import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoutes = (props) => {
    const isAuthenticated = !!props.token; // Check if the token exists

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

const mapStateToProps = (state) => {
    return { token: state.account.token }
}

export default connect(mapStateToProps, null)(PrivateRoutes);
