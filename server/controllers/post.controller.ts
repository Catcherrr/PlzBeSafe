import { Request, Response } from 'express';
import {
    insertPost as uploadPost,
    updatePost as modifyPost,
    findOneByIdPosts as inquirePost,
    findAllByPagePosts as pagenationPost,
    deletePosts,
} from '../services/post.service';
import { statusCode } from '../util/responseForm';
import { serviceReturnForm, statusTrans } from '../modules/controller.modules';

let serviceReturnForm = {};

export const insertPost = async (req: Request, res: Response) => {
    const { jwt, title, content, longitude, latitude, incident_date } =
        req.body;
    if (!title) {
        serviceReturnForm = {
            status: statusCode.client_error.noPostContent,
            message: '제목을 입력해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noPostContent)).json(
            serviceReturnForm
        );
        return;
    }

    if (!content) {
        serviceReturnForm = {
            status: statusCode.client_error.noPostContent,
            message: '내용을 입력해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noPostContent)).json(
            serviceReturnForm
        );
        return;
    }

    if (!latitude) {
        serviceReturnForm = {
            status: statusCode.client_error.noPostContent,
            message: '경도를 입력해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noPostContent)).json(
            serviceReturnForm
        );
        return;
    }

    if (!longitude) {
        serviceReturnForm = {
            status: statusCode.client_error.noPostContent,
            message: '위도를 입력해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noPostContent)).json(
            serviceReturnForm
        );
        return;
    }

    return uploadPost(
        { title, content, latitude, longitude, incident_date },
        jwt
    )
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '글쓰기 성공',
                    result: { id: data.id },
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            }
        })
        .catch((err: any) => {
            console.log('[post/insertPost/uploadPost] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbInsertError,
                message: '글쓰기 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbInsertError)).json(
                serviceReturnForm
            );
            return;
        });
};

export const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, longitude, latitude, incident_date } = req.body;
    if (!title) {
        serviceReturnForm = {
            status: statusCode.client_error.noPostContent,
            message: '제목을 입력해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noPostContent)).json(
            serviceReturnForm
        );
        return;
    }

    if (!content) {
        serviceReturnForm = {
            status: statusCode.client_error.noPostContent,
            message: '내용을 입력해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noPostContent)).json(
            serviceReturnForm
        );
        return;
    }

    if (!latitude) {
        serviceReturnForm = {
            status: statusCode.client_error.noPostContent,
            message: '경도를 입력해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noPostContent)).json(
            serviceReturnForm
        );
        return;
    }

    if (!longitude) {
        serviceReturnForm = {
            status: statusCode.client_error.noPostContent,
            message: '위도를 입력해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noPostContent)).json(
            serviceReturnForm
        );
        return;
    }

    return modifyPost(Number(id), {
        title,
        content,
        latitude,
        longitude,
        incident_date,
    })
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '글 수정 성공',
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.noPostContent,
                    message: '존재하지 않는 글입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.noPostContent)
                ).json(serviceReturnForm);
                return;
            }
        })
        .catch((err: any) => {
            console.log('[post/updatePost/modifyPost] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbUpdateError,
                message: '글 수정 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbUpdateError)).json(
                serviceReturnForm
            );
            return;
        });
};

export const findOnePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    return inquirePost(Number(id))
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '한 개의 글 찾기 성공',
                    result: data,
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.noPostContent,
                    message: '존재하지 않는 글입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.noPostContent)
                ).json(serviceReturnForm);
                return;
            }
        })
        .catch((err: any) => {
            console.log('[post/findOnePost/inquirePost] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbSelectError,
                message: '한 개의 글 찾기 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbSelectError)).json(
                serviceReturnForm
            );
            return;
        });
};

export const findAllByPagePost = async (req: Request, res: Response) => {
    const { page } = req.params;

    return inquirePost(Number(page))
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '페이지 당 글 찾기 성공',
                    result: { data },
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            }
        })
        .catch((err: any) => {
            console.log('[post/findOnePost/inquirePost] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbSelectError,
                message: '페이지당 글 찾기 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbSelectError)).json(
                serviceReturnForm
            );
            return;
        });
};

export const deleteOnePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    return deletePosts(Number(id))
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '글 삭제 성공',
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.noPostContent,
                    message: '존재하지 않는 글입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.noPostContent)
                ).json(serviceReturnForm);
                return;
            }
        })
        .catch((err: any) => {
            console.log('[post/deletePost/deletePosts] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbDeleteError,
                message: '글 삭제 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbDeleteError)).json(
                serviceReturnForm
            );
            return;
        });
};
