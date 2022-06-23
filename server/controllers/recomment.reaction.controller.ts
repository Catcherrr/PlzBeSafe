import { Request, Response } from 'express';
import {
    insertReaction as pushReaction,
    findAllByRecommentIdReactions as inquireByRecommentId,
    deleteReactions,
    findOneReactions
} from '../services/recomment.reaction.service';
import { findOneByJwtUser } from '../services/user.service';
import { statusCode } from '../util/responseForm';
import { serviceReturnForm, statusTrans } from '../modules/controller.modules';

let serviceReturnForm = {};

export const insertReaction = async (req: Request, res: Response) => {
    const { recommentId } = req.params;
    const { jwt } = req.body;

    if(!jwt) {
        serviceReturnForm = {
            status: statusCode.client_error.defaultValue,
            message: '토큰이 없습니다',
        };
        res.status(statusTrans(statusCode.client_error.defaultValue)).json(
            serviceReturnForm
        );
        return;
    }

    if (!recommentId) {
        serviceReturnForm = {
            status: statusCode.client_error.noCommentContent,
            message: '존재하지 않는 대댓글입니다',
        };
        res.status(statusTrans(statusCode.client_error.noCommentContent)).json(
            serviceReturnForm
        );
        return;
    }

    findOneByJwtUser(jwt)
        .then((user: any) => {
            if(user) {
                return findOneReactions(user.id, Number(recommentId)).then((reaction:any) => {
                    if(reaction){
                        serviceReturnForm = {
                            status: statusCode.server_error.defaultValue,
                            message: `이미 추천했습니다`,
                        };
                        res.status(
                            statusTrans(statusCode.server_error.defaultValue)
                        ).json(serviceReturnForm);
                        return;
                    } else {
                        return pushReaction({
                            userId: user.id,
                            recommentId: Number(recommentId)
                        }).then((data: any) => {
                            if (data) {
                                serviceReturnForm = {
                                    status: statusCode.ok.defaultValue,
                                    message: `대댓글 추천 성공`,
                                    result: { id: data.id },
                                };
                                res.status(
                                    statusTrans(statusCode.ok.defaultValue)
                                ).json(serviceReturnForm);
                                return;
                            }
                        }).catch((err: any) => {
                            console.log(
                                '[reaction/insertReaction/pushReaction] ' +
                                    err
                            );
                            serviceReturnForm = {
                                status: statusCode.server_error.dbInsertError,
                                message: `대댓글 추천 실패`,
                            };
                            res.status(
                                statusTrans(statusCode.server_error.dbInsertError)
                            ).json(serviceReturnForm);
                            return;
                        })
                    }
                })              
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

        }).catch((err: any) => {
            console.log('[reaction/findOneByJwtUser] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbSelectError,
                message: '회원을 찾는 데 오류가 발생했습니다',
            };
            res.status(statusTrans(statusCode.server_error.dbSelectError)).json(
                serviceReturnForm
            );
            return;
        })
};

export const findAllByRecommentId = async (req: Request, res: Response) => {
    const { recommentId } = req.params;

    return inquireByRecommentId(Number(recommentId))
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '대댓글별로 추천 전부 찾기 성공',
                    result: data,
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            }
        })
        .catch((err: any) => {
            console.log('[reaction/findAllByPostId/inquireByPostId] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbSelectError,
                message: '대댓글별로 추천 전부 찾기 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbSelectError)).json(
                serviceReturnForm
            );
            return;
        });
};

export const deleteOneReaction = async (req: Request, res: Response) => {
    const { id } = req.params;

    return deleteReactions(Number(id))
        .then((data: any) => {
            if (data) {
                serviceReturnForm = {
                    status: statusCode.ok.defaultValue,
                    message: '대댓글 추천 삭제 성공',
                };
                res.status(statusTrans(statusCode.ok.defaultValue)).json(
                    serviceReturnForm
                );
                return;
            } else {
                serviceReturnForm = {
                    status: statusCode.client_error.defaultValue,
                    message: '이미 추천하지 않은 댓글입니다',
                };
                res.status(
                    statusTrans(statusCode.client_error.defaultValue)
                ).json(serviceReturnForm);
                return;
            }
        })
        .catch((err: any) => {
            console.log('[reaction/deleteReaction/deleteReactions] ' + err);
            serviceReturnForm = {
                status: statusCode.server_error.dbDeleteError,
                message: '대댓글 추천 삭제 실패',
            };
            res.status(statusTrans(statusCode.server_error.dbDeleteError)).json(
                serviceReturnForm
            );
            return;
        });
};
