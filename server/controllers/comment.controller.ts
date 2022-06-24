import { Request, Response } from 'express';
import {
    insertComment as uploadComment,
    updateComment as modifyComment,
    findOneByIdComments as inquireComment,
    findAllByPostIdComments as findCommentByPostId,
    deleteComments,
} from '../services/comment.service';
import { findOneByJwtUser } from '../services/user.service';
import { statusCode } from '../util/responseForm';
import { serviceReturnForm, statusTrans } from '../modules/controller.modules';

let serviceReturnForm = {};

export const insertComment = async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { jwt, content } = req.body;

    if (!postId) {
        serviceReturnForm = {
            status: statusCode.client_error.noPostContent,
            message: '존재하지 않는 글입니다',
        };
        res.status(statusTrans(statusCode.client_error.noPostContent)).json(
            serviceReturnForm
        );
        return;
    }

    if (!content) {
        serviceReturnForm = {
            status: statusCode.client_error.noCommentContent,
            message: '내용을 입력해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noCommentContent)).json(
            serviceReturnForm
        );
        return;
    }

    return findOneByJwtUser(jwt)
        .then((data: any) => {
            if (data) {
                return uploadComment({
                    userId: data.id,
                    postId: Number(postId),
                    content,
                })
                    .then((data: any) => {
                        if (data) {
                            serviceReturnForm = {
                                status: statusCode.ok.defaultValue,
                                message: '댓글쓰기 성공',
                                result: { id: data.id },
                            };
                            res.status(
                                statusTrans(statusCode.ok.defaultValue)
                            ).json(serviceReturnForm);
                            return;
                        }
                    })
                    .catch((err: any) => {
                        console.log(
                            '[comment/insertComment/findOneByJwtUser/uploadComment] ' +
                                err
                        );
                        serviceReturnForm = {
                            status: statusCode.server_error.dbInsertError,
                            message: '댓글쓰기 실패',
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

export const updateComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        serviceReturnForm = {
            status: statusCode.client_error.noCommentContent,
            message: '내용을 입력해주세요',
        };
        res.status(statusTrans(statusCode.client_error.noCommentContent)).json(
            serviceReturnForm
        );
        return;
    }

    return modifyComment(Number(id), {
        content,
    })
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '댓글 수정 성공',
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.noCommentContent,
                    message: '존재하지 않는 댓글입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.noCommentContent)
                ).json(serviceReturnForm);
                return;
            }
        })
        .catch((err: any) => {
            console.log('[comment/updateComment/modifyComment] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbUpdateError,
                message: '댓글 수정 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbUpdateError)).json(
                serviceReturnForm
            );
            return;
        });
};

export const findOneComment = async (req: Request, res: Response) => {
    const { id } = req.params;

    return inquireComment(Number(id))
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '한 개의 댓글 찾기 성공',
                    result: data,
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.noCommentContent,
                    message: '존재하지 않는 댓글입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.noCommentContent)
                ).json(serviceReturnForm);
                return;
            }
        })
        .catch((err: any) => {
            console.log('[comment/findOneComment/inquireComment] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbSelectError,
                message: '한 개의 댓글 찾기 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbSelectError)).json(
                serviceReturnForm
            );
            return;
        });
};

export const findAllByPostId = async (req: Request, res: Response) => {
    const { postId } = req.params;

    return findCommentByPostId(Number(postId))
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '글별로 댓글 전부 찾기 성공',
                    result: data,
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            }
        })
        .catch((err: any) => {
            console.log('[comment/findAllByPostId/findCommentByPostId] ' + err);
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

export const deleteOneComment = async (req: Request, res: Response) => {
    const { id } = req.params;

    return deleteComments(Number(id))
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '댓글 삭제 성공',
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.noCommentContent,
                    message: '존재하지 않는 댓글입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.noCommentContent)
                ).json(serviceReturnForm);
                return;
            }
        })
        .catch((err: any) => {
            console.log('[comment/deleteComment/deleteComments] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbDeleteError,
                message: '댓글 삭제 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbDeleteError)).json(
                serviceReturnForm
            );
            return;
        });
};
