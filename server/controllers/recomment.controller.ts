import { Request, Response } from 'express';
import {
    insertRecomment as uploadRecomment,
    updateRecomment as modifyRecomment,
    findOneByIdRecomments as inquireRecomment,
    findAllByCommentIdRecomments as findRecommentByCommentId,
    deleteRecomments,
} from '../services/recomment.service';
import { findOneByJwtUser } from '../services/user.service';
import { statusCode } from '../util/responseForm';
import { serviceReturnForm, statusTrans } from '../modules/controller.modules';

let serviceReturnForm = {};

export const insertRecomment = async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const { jwt, content } = req.body;

    if (!commentId) {
        serviceReturnForm = {
            status: statusCode.client_error.noCommentContent,
            message: '존재하지 않는 댓글입니다',
        };
        res.status(statusTrans(statusCode.client_error.noCommentContent)).json(
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
                return uploadRecomment({
                    userId: data.id,
                    commentId: Number(commentId),
                    content,
                })
                    .then((data: any) => {
                        if (data) {
                            serviceReturnForm = {
                                status: statusCode.ok.defaultValue,
                                message: '대댓글쓰기 성공',
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
                            '[recomment/insertRecomment/findOneByJwtUser/uploadRecomment] ' +
                                err
                        );
                        serviceReturnForm = {
                            status: statusCode.server_error.dbInsertError,
                            message: '대댓글쓰기 실패',
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
            console.log('[recomment/insertRecomment/findOneByJwtUser] ' + err);
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

export const updateRecomment = async (req: Request, res: Response) => {
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

    return modifyRecomment(Number(id), {
        content,
    })
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '대댓글 수정 성공',
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
            console.log('[recomment/updateRecomment/modifyRecomment] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbUpdateError,
                message: '대댓글 수정 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbUpdateError)).json(
                serviceReturnForm
            );
            return;
        });
};

export const findOneRecomment = async (req: Request, res: Response) => {
    const { id } = req.params;

    return inquireRecomment(Number(id))
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '한 개의 대댓글 찾기 성공',
                    result: data,
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.noCommentContent,
                    message: '존재하지 않는 대댓글입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.noCommentContent)
                ).json(serviceReturnForm);
                return;
            }
        })
        .catch((err: any) => {
            console.log('[recomment/findOneRecomment/inquireRecomment] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbSelectError,
                message: '한 개의 대댓글 찾기 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbSelectError)).json(
                serviceReturnForm
            );
            return;
        });
};

export const findAllByCommentId = async (req: Request, res: Response) => {
    const { commentId } = req.params;

    return findRecommentByCommentId(Number(commentId))
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '댓글별로 대댓글 전부 찾기 성공',
                    result: data,
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            }
        })
        .catch((err: any) => {
            console.log('[recomment/findAllByCommentId/findRecommentByCommentId] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbSelectError,
                message: '댓글별로 댓글 찾기 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbSelectError)).json(
                serviceReturnForm
            );
            return;
        });
};

export const deleteOneRecomment = async (req: Request, res: Response) => {
    const { id } = req.params;

    return deleteRecomments(Number(id))
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '대댓글 삭제 성공',
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.noCommentContent,
                    message: '존재하지 않는 대댓글입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.noCommentContent)
                ).json(serviceReturnForm);
                return;
            }
        })
        .catch((err: any) => {
            console.log('[recomment/deleteRecomment/deleteRecomments] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbDeleteError,
                message: '대댓글 삭제 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbDeleteError)).json(
                serviceReturnForm
            );
            return;
        });
};
