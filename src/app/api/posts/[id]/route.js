import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function GET(req, res) {
	const id = req.url.split("posts/")[1];
	const result = await prisma.post.findUnique({
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
		const id = req.url.split("posts/")[1];
		const reqBody = await req.json();

		const result = await prisma.post.update({
			where: {
				id: id,
			},
			data: {
				"authorId"   : reqBody["authorId"],
				"parentId"   : reqBody["parentId"],
				"title"      : reqBody["title"],
				"metaTitle"  : reqBody["metaTitle"],
				"slug"       : reqBody["slug"],
				"summary"    : reqBody["summary"],
				"published"  : reqBody["published"],
				"createdAt"  : new Date(reqBody["createdAt"]).toISOString(),
				"updatedAt"  : new Date(reqBody["updatedAt"]).toISOString(),
				"publishedAt": new Date(reqBody["publishedAt"]).toISOString(),
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
		const id = req.url.split("posts/")[1];
		const result = await prisma.post.delete({
			where: {
				id: id,
			}
		});
		
		return NextResponse.json({ status: "Success", result: "Delete post successfully" });
	} catch (err) {
		return NextResponse.json({ status: "Fail", result: err.toString() });
	}
}