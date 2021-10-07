import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import AppWrapper from './AppWrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import "bootstrap/scss/bootstrap.scss";
import './style.css';
import {
ApolloClient,
InMemoryCache,
ApolloProvider,
} from "@apollo/client";



const client = new ApolloClient({
	uri: 'http://localhost:8000/graphql/',
	cache: new InMemoryCache()
                            });


ReactDOM.render(
	<ApolloProvider client={client}>			
	<HashRouter>
	<AppWrapper></AppWrapper>
	</HashRouter>,
	</ApolloProvider>,
	document.getElementById('root')
);

