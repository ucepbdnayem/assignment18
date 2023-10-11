import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();
export async function GET(req, res) {
	try {
	    let result = await prisma.post.findMany();
	    return NextResponse.json({ status: "Success", result: result });
	} catch (err) {
	    return NextResponse.json({ status: "Fail", result: err.toString() });
	}
}

export async function POST(req, res) {
	BigInt.prototype.toJSON = function () {
		return this.toString();
	};
	try {
		const reqBody = await req.json();
		console.log(reqBody)
		const result = await prisma.post.create({
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
			}
		});
		
		return NextResponse.json({ status: "Success", result: result });
	} catch (err) {
		return NextResponse.json({ status: "Fail", result: err.toString() });
	}
}
