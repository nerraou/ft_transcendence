import { Injectable } from "@nestjs/common";

import { PrismaService } from "@common/modules/prisma/prisma.service";

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, content: string, imagePath: string | undefined) {
    return this.prisma.post.create({
      data: {
        userId,
        content,
        imagePath,
      },
    });
  }

  getPosts(page: number, limit: number) {
    return this.prisma.post.findMany({
      skip: (page - 1) * page,
      take: limit,
      include: {
        postLikes: {
          select: {
            userId: true,
          },
        },
        owner: {
          select: {
            id: true,
            username: true,
            avatarPath: true,
            firstName: true,
            lastName: true,
            status: true,
          },
        },
      },
      orderBy: [
        {
          likesCount: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });
  }

  async toggleLike(postId: number, userId: number) {
    const postLike = await this.prisma.postLike.findUnique({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
    });

    if (postLike) {
      return this.prisma.$transaction([
        this.prisma.postLike.delete({
          where: {
            userId_postId: {
              postId,
              userId,
            },
          },
        }),
        this.prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            likesCount: {
              decrement: 1,
            },
          },
        }),
      ]);
    }

    return this.prisma.$transaction([
      this.prisma.postLike.create({
        data: {
          postId,
          userId,
        },
      }),
      this.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likesCount: {
            increment: 1,
          },
        },
      }),
    ]);
  }

  getPostId(id: number) {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }
}
