import apiService from './apiService';
import queryService from './queryService';
import { Alert, Platform } from 'react-native';
import errorService from './errorService';

var fetchService = {

    login: async function (email, password,FCMToken) {
        let API = apiService.login;
        try {
            let params = {
                email,
                password,
                FCMToken,
            };
            //  console.log('login', params,API);
            let queryParams = queryService.preareQueryParams(params);
            // console.log(queryParams);
            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: queryParams,
            });

            const resData = await response.text();
            //   console.log('res', resData);
            if (!resData.success) {
                // alert(resData.message);
            }
            if (!resData.success) {
                const message = resData.msg;
                const errorRes = {
                    status: false,
                    data: message,
                    code: resData.success,
                    msg: message,
                };
            }
            return { status: true, data: resData.data };
        } catch (e) {
            var res = errorService.checkErrors(e);
            if (
                res &&
                typeof res === 'object' &&
                res.constructor === Object &&
                res.hasOwnProperty('status')
            ) {
                return res;
            }
            throw e;
        }
    },
    register: async function (
        FirstName,
        UserName,
        LastName,
        EmailId,
        PWord,
        ProfileImage,
        CountryCode,
        ContactNumber,
        ZipCode,
        Gender,
    ) {
        let API = apiService.register;
        try {
            let params = {
                FirstName,
                UserName,
                LastName,
                EmailId,
                PWord,
                ProfileImage,
                CountryCode,
                ContactNumber,
                ZipCode,
                Gender,
            };
            let queryParams = queryService.preareQueryParams(params);
            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
                body: queryParams,
            });
            const resData = await response.json();
            if (!resData.success) {
                // alert(resData.message);
            }
            if (!resData.success) {
                const message = resData.msg;
                const errorRes = {
                    status: false,
                    data: message,
                    code: resData.success,
                    msg: message,
                };
            }
            return { status: true, data: resData.data };
        } catch (e) {
            var res = errorService.checkErrors(e);

            if (
                res &&
                typeof res === 'object' &&
                res.constructor === Object &&
                res.hasOwnProperty('status')
            ) {
                return res;
            }
            throw e;
        }
    },
}

export default fetchService;