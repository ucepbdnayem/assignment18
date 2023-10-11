import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function GET(req, res) {
	const id = req.url.split("postcomments/")[1];
	const result = await prisma.post_comment.findUnique({
		where: {
			id: id,
		},
	});
	if (!result) {
		return NextResponse.json({ status: "Fail", result: err.toString() });
	}
	return NextResponse.json({ status: "Success", result: result });
}
//
export async function PATCH(req, res) {
	try {
		const id = req.url.split("postcomments/")[1];
		const reqBody = await req.json();

		const result = await prisma.post_comment.update({
			where: {
				id: id,
			},
			data: {
				"postId"   : reqBody["postId"],
				"parentId"   : reqBody["parentId"],
				"title"      : reqBody["title"],
				"published"  : reqBody["published"],
				"createdAt"  : new Date(reqBody["createdAt"]).toISOString(),
				"publishedAt"  : new Date(reqBody["publishedAt"]).toISOString(),
				"content"    : reqBody["content"]
			},
		});
		
		return NextResponse.json({ status: "Success", result: result });
	} catch (err) {
		return NextResponse.json({ status: "Fail", result: err.toString() });
	}
}
//
export async function DELETE(req, res) {
	try {
		const id = req.url.split("postcomments/")[1];
		const result = await prisma.post_comment.delete({
			where: {
				id: id,
			}
		});
		
		return NextResponse.json({ status: "Success", result: "Delete post comments successfully" });
	} catch (err) {
		return NextResponse.json({ status: "Fail", result: err.toString() });
	}
}