import { Request, Response } from 'express';
import {
    insertPost as uploadPost,
    updatePost as modifyPost,
    findOneByIdPosts as inquirePost,
    findAllByPagePosts as pagenationPost,
    deletePosts,
} from '../services/post.service';
import { findOneByJwtUser } from '../services/user.service';
import { statusCode } from '../util/responseForm';
import { serviceReturnForm, statusTrans } from '../modules/controller.modules';

let serviceReturnForm = {};

// 글쓰기
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

    return findOneByJwtUser(jwt)
        .then((data: any) => {
            if (data) {
                return uploadPost({
                    userId: data.id,
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
                                message: '글쓰기 성공',
                                result: { id: data.id },
                            };
                            res.status(
                                statusTrans(statusCode.ok.defaultValue)
                            ).json(serviceReturnForm);
                            return;
                        }
                    })
                    .catch((err: any) => {
                        console.log('[post/insertPost/uploadPost] ' + err);
                        serviceReturnForm = {
                            status: statusCode.server_error.dbInsertError,
                            message: '글쓰기 실패',
                        };
                        res.status(
                            statusTrans(statusCode.server_error.dbInsertError)
                        ).json(serviceReturnForm);
                        return;
                    });
            } else {
                serviceReturnForm = {
                    status: statusCode.server_error.dbSelectError,
                    message: '존재하지 않은 회원입니다',
                };
                res.status(
                    statusTrans(statusCode.server_error.dbSelectError)
                ).json(serviceReturnForm);
                return;
            }
        })
        .catch((err: any) => {
            console.log('[comment/insertComment/findOneByJwtUser] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbSelectError,
                message: '회원을 찾는 데 오류가 발생했습니다',
            };
            res.status(statusTrans(statusCode.server_error.dbSelectError)).json(
                serviceReturnForm
            );
            return;
        });
};

// 글수정
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

// 글 1개 찾기
export const findOnePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    return inquirePost(Number(id))
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '글 1개 조회 성공',
                    result: {
                        title: data.title,
                        writer: data.user.name,
                        content: data.content,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        incident_date: data.incident_date,
                        updatedAt: data.updatedAt,
                        reactionCount: data.postReactions.length,
                        comments: data.comments.map((v:any, i:number)=>{
                            return {
                                content: v.content,
                                writer: v.user.name,
                                updatedAt: v.updatedAt,
                                reactionCount: v.commentReactions.length,
                            }
                        })
                    },
                };
                res.status(
                    statusTrans(statusCode.ok.defaultValue)
                ).json(serviceReturnForm);
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

// 글 페이지 별로 조회
export const findAllByPagePost = async (req: Request, res: Response) => {
    const { page } = req.params;

    return pagenationPost(Number(page))
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '페이지 당 글 찾기 성공',
                    result: data,
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            }
        })
        .catch((err: any) => {
            console.log('[post/findAllByPagePost/pagenationPost] ' + err);
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

// 글 1개 삭제
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
